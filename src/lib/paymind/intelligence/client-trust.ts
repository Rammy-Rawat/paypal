import type { ClientTrustRequest } from "./schemas";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function assessClientEvidence(input: ClientTrustRequest) {
  const evidenceCount = input.projectsCompleted + input.paymentsOnTime + input.paymentsLate
    + input.disputes + input.cancellations + input.scopeChanges;

  if (evidenceCount === 0) {
    return {
      clientName: input.clientName,
      assessment: "insufficient_evidence" as const,
      score: null,
      label: "Insufficient evidence",
      evidenceCount: 0,
      factors: [],
      limitations: ["No project or payment history was supplied.", "Missing information is unknown, not evidence of misconduct."],
      source: input.evidenceSource,
      period: input.period,
      disclaimer: "This is an evidence summary based only on records you supplied or are authorized to use. It is not a fraud determination, credit score, identity verification, or statement about a person's character.",
    };
  }

  // Transparent, bounded heuristic. It is an internal planning indicator, not a credit score.
  let score = 50;
  score += Math.min(input.projectsCompleted * 2, 10);
  score += Math.min(input.paymentsOnTime * 2, 20);
  score -= Math.min(input.paymentsLate * 5, 25);
  score -= Math.min(input.disputes * 10, 30);
  score -= Math.min(input.cancellations * 3, 9);
  score -= Math.min(input.scopeChanges * 2, 10);
  score = clamp(score, 0, 100);

  const factors: Array<{ direction: "positive" | "caution"; title: string; detail: string }> = [];
  if (input.projectsCompleted > 0) factors.push({ direction: "positive", title: "Completed projects recorded", detail: `${input.projectsCompleted} completed project(s) in the supplied records.` });
  if (input.paymentsOnTime > 0) factors.push({ direction: "positive", title: "On-time payments recorded", detail: `${input.paymentsOnTime} on-time payment(s) in the supplied records.` });
  if (input.paymentsLate > 0) factors.push({ direction: "caution", title: "Late payments recorded", detail: `${input.paymentsLate} late payment(s) in the supplied records.` });
  if (input.disputes > 0) factors.push({ direction: "caution", title: "Disputes recorded", detail: `${input.disputes} dispute(s) in the supplied records. The context and outcome were not assessed.` });
  if (input.cancellations > 0) factors.push({ direction: "caution", title: "Cancellations recorded", detail: `${input.cancellations} cancellation(s) in the supplied records.` });
  if (input.scopeChanges > 0) factors.push({ direction: "caution", title: "Scope changes recorded", detail: `${input.scopeChanges} scope change(s); these may be ordinary project changes and are not proof of misconduct.` });

  const label = score >= 75 ? "Positive history in supplied records"
    : score >= 50 ? "Mixed or limited history"
      : "Several caution indicators in supplied records";

  return {
    clientName: input.clientName,
    assessment: "based_on_supplied_records" as const,
    score,
    label,
    evidenceCount,
    factors,
    limitations: [
      "Counts may overlap and depend on the accuracy and completeness of the supplied records.",
      "A dispute is not proof that either party acted improperly; review its outcome and context.",
      "No external reputation search, identity check, or private-data lookup is performed.",
    ],
    source: input.evidenceSource,
    period: input.period,
    disclaimer: "This is an evidence summary based only on records you supplied or are authorized to use. It is not a fraud determination, credit score, identity verification, or statement about a person's character.",
  };
}
