import { ContractTermsSchema, type ContractTerms } from "./schemas";
import { extractContractTermsWithAI } from "./ai-provider";

export type ContractFinding = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  explanation: string;
  recommendation: string;
  evidence: string | null;
};

function firstMatch(text: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[0]) return match[0].slice(0, 240);
  }
  return null;
}

function basicExtraction(text: string): ContractTerms {
  const amountMatch = text.match(/\b(USD|EUR|GBP|INR|CAD|AUD|SGD|AED)\s*([\d,]+(?:\.\d{1,2})?)\b/i);
  const currencySymbolMatch = text.match(/([$€£₹])\s*([\d,]+(?:\.\d{1,2})?)/);
  const currencyMap: Record<string, string> = { "$": "USD", "€": "EUR", "£": "GBP", "₹": "INR" };
  const revision = firstMatch(text, [/\b(?:up to )?\d+\s+(?:rounds?|sets?)\s+of revisions?\b/i, /\b(?:unlimited|no limit)\s+revisions?\b/i]);
  const deadline = firstMatch(text, [/(?:delivery|completion|deadline|due date)[^\n.;]{0,100}/i]);
  const payment = firstMatch(text, [/(?:payment|invoice|deposit|advance)[^\n.;]{0,180}/i]);
  return ContractTermsSchema.parse({
    clientName: null,
    currency: amountMatch?.[1]?.toUpperCase() ?? (currencySymbolMatch ? currencyMap[currencySymbolMatch[1]] : null),
    totalAmount: amountMatch?.[2]?.replace(/,/g, "") ?? currencySymbolMatch?.[2]?.replace(/,/g, "") ?? null,
    paymentTerms: payment,
    milestones: [],
    deliverables: [],
    deadline,
    revisionLimit: revision,
    cancellationTerms: firstMatch(text, [/\b(?:cancel|cancellation|terminate|termination)[^\n.;]{0,180}/i]),
    intellectualPropertyTerms: firstMatch(text, [/\b(?:intellectual property|copyright|ownership|work[- ]for[- ]hire)[^\n.;]{0,180}/i]),
    disputeTerms: firstMatch(text, [/\b(?:dispute|arbitration|mediation|jurisdiction)[^\n.;]{0,180}/i]),
    governingLaw: firstMatch(text, [/\b(?:governed by|governing law|laws of)[^\n.;]{0,120}/i]),
    evidence: [],
  });
}

function makeFinding(
  id: string,
  severity: ContractFinding["severity"],
  title: string,
  explanation: string,
  recommendation: string,
  evidence: string | null,
): ContractFinding {
  return { id, severity, title, explanation, recommendation, evidence };
}

function runDeterministicChecks(text: string, terms: ContractTerms): ContractFinding[] {
  const lower = text.toLowerCase();
  const findings: ContractFinding[] = [];
  if (!terms.paymentTerms || !/(payment|invoice|deposit|advance|milestone)/i.test(text)) {
    findings.push(makeFinding("payment-terms-missing", "high", "Payment schedule is unclear", "The supplied text does not clearly state when invoices are due or when payments must be made.", "Add the amount, currency, due date, payment method, and consequences of late payment.", null));
  }
  if (!terms.deliverables.length && !/(deliverables?|scope of work|specifications?|will provide|will create)/i.test(text)) {
    findings.push(makeFinding("scope-unclear", "high", "Deliverables are not clearly defined", "The contract text does not identify concrete outputs that can be checked at review time.", "List each deliverable, format, acceptance criteria, and what is outside the agreed scope.", null));
  }
  const unlimitedRevision = /unlimited revisions?|unlimited changes?|as many revisions as (?:needed|required)/i.test(text);
  if (unlimitedRevision) {
    findings.push(makeFinding("unlimited-revisions", "high", "Potentially unlimited revisions", "The text appears to allow revisions without a clear numerical or scope limit.", "Set a revision count, define what qualifies as a revision, and price additional requests separately.", firstMatch(text, [/unlimited revisions?[^\n.;]*/i, /unlimited changes?[^\n.;]*/i])));
  } else if (!terms.revisionLimit) {
    findings.push(makeFinding("revision-limit-missing", "medium", "Revision limits are not explicit", "No clear revision allowance was identified in the supplied contract text.", "Specify the included revision rounds and the process for changes outside the agreed scope.", null));
  }
  if (/(payment|fee|balance)[^\n.;]{0,100}(?:upon acceptance|after acceptance|at client discretion)/i.test(text) && !/(acceptance[^\n.;]{0,100}(?:\d+\s+days?|business days?))/i.test(text)) {
    findings.push(makeFinding("subjective-acceptance", "high", "Payment may depend on subjective acceptance", "Payment appears linked to acceptance, but a clear review window or objective acceptance test was not found.", "Define objective acceptance criteria, a fixed review period, and a process for itemized rejection notices.", firstMatch(text, [/(?:payment|fee|balance)[^\n.;]{0,100}(?:upon acceptance|after acceptance|at client discretion)/i])));
  }
  if (!terms.cancellationTerms && !/(cancel|cancellation|terminate|termination)/i.test(text)) {
    findings.push(makeFinding("termination-missing", "medium", "Cancellation and termination terms are missing", "No clear process for ending the project or paying for completed work was identified.", "Define notice, payment for completed milestones, non-refundable costs where lawful, and delivery of work completed to date.", null));
  }
  if (!/(late fee|late payment|overdue|interest on overdue)/i.test(text)) {
    findings.push(makeFinding("late-payment-remedy-missing", "low", "No late-payment remedy identified", "The supplied text does not appear to specify what happens when an invoice is overdue.", "Consider a reasonable payment reminder and overdue-payment process, subject to applicable law.", null));
  }
  if (/(transfer|assign|ownership|copyright)[^\n.;]{0,160}(?:upon creation|immediately|on delivery)/i.test(text) && !/(payment in full|paid in full|full payment)/i.test(text)) {
    findings.push(makeFinding("ip-transfer-timing", "high", "IP transfer timing may be unclear", "The text may transfer ownership before full payment, or it does not clearly condition transfer on full payment.", "State precisely when the licence or ownership transfers and what rights apply before final payment.", firstMatch(text, [/(?:transfer|assign|ownership|copyright)[^\n.;]{0,160}/i])));
  }
  if (/(including but not limited to|as needed|reasonable changes|all other tasks)/i.test(lower)) {
    findings.push(makeFinding("broad-scope-language", "medium", "Broad scope language could invite scope creep", "The contract contains open-ended wording that may make the work boundary difficult to enforce.", "Replace broad language with a finite deliverables list and a written change-request process.", firstMatch(text, [/(including but not limited to|as needed|reasonable changes|all other tasks)[^\n.;]*/i])));
  }
  return findings;
}

export async function analyzeContract(contractText: string, projectType?: string) {
  const aiTerms = await extractContractTermsWithAI(contractText).catch(() => null);
  const terms = aiTerms
    ? { ...aiTerms, evidence: aiTerms.evidence.filter((quote) => quote.length > 8 && contractText.includes(quote)) }
    : basicExtraction(contractText);
  const findings = runDeterministicChecks(contractText, terms);
  const weights = { high: 20, medium: 10, low: 4 } as const;
  const riskScore = Math.min(100, findings.reduce((sum, finding) => sum + weights[finding.severity], 0));
  const riskLevel = riskScore >= 50 ? "high" : riskScore >= 20 ? "medium" : "low";

  return {
    projectType: projectType || null,
    analysisMode: aiTerms ? "AI extraction + deterministic checks" : "deterministic checks (AI provider not configured or unavailable)",
    aiExtractionAvailable: Boolean(aiTerms),
    extractionWarning: aiTerms ? "AI-extracted terms are suggestions. Verify every field against the original document; only exact quotations retained in evidence were found in the supplied text." : "No AI extraction was available. Basic pattern extraction and deterministic checks were used; review terms manually.",
    terms,
    findings,
    riskScore,
    riskLevel,
    disclaimer: "This is an issue-spotting aid, not legal advice. Confirm extracted terms against the original contract and ask a qualified professional about legal questions.",
  };
}
