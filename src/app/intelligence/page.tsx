"use client";

import { useState, type ReactNode } from "react";

type Panel = "contract" | "simulator" | "trust";
type ApiResult = { ok: boolean; data?: unknown; error?: string };

async function postJson(url: string, payload: unknown): Promise<ApiResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json() as unknown;
    if (!response.ok) {
      const message = typeof data === "object" && data !== null && "error" in data
        ? String((data as { error: unknown }).error)
        : `Request failed (${response.status})`;
      return { ok: false, error: message, data };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Could not reach PayMind. Check that the development server is running." };
  }
}

function Result({ result }: { result: ApiResult | null }) {
  if (!result) return null;
  return (
    <section className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-2 font-semibold">{result.ok ? "Analysis result" : "Request error"}</h3>
      {result.error && <p className="mb-3 text-sm text-red-600">{result.error}</p>}
      {result.data !== undefined && (
        <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-slate-700 dark:text-slate-200">{JSON.stringify(result.data, null, 2)}</pre>
      )}
    </section>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";
const buttonClass = "rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50";

export default function IntelligencePage() {
  const [panel, setPanel] = useState<Panel>("contract");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const [contractText, setContractText] = useState("");
  const [projectType, setProjectType] = useState("Web development");

  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState("83");
  const [feePercent, setFeePercent] = useState("4.4");
  const [fixedFee, setFixedFee] = useState("0.30");
  const [fxSpread, setFxSpread] = useState("2");
  const [withholding, setWithholding] = useState("0");
  const [capitalCost, setCapitalCost] = useState("12");
  const [workBeforePayment, setWorkBeforePayment] = useState("40");

  const [clientName, setClientName] = useState("");
  const [evidenceSource, setEvidenceSource] = useState("My previous project and payment records");
  const [period, setPeriod] = useState("Last 12 months");
  const [projectsCompleted, setProjectsCompleted] = useState("0");
  const [paymentsOnTime, setPaymentsOnTime] = useState("0");
  const [paymentsLate, setPaymentsLate] = useState("0");
  const [disputes, setDisputes] = useState("0");
  const [cancellations, setCancellations] = useState("0");
  const [scopeChanges, setScopeChanges] = useState("0");

  async function run(url: string, payload: unknown) {
    setBusy(true);
    setResult(null);
    const response = await postJson(url, payload);
    setResult(response);
    setBusy(false);
  }

  const number = (value: string) => Number(value || 0);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">PayMind Intelligence</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Make safer project decisions</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">Review contract terms, compare payment structures, and summarize client history using records you are authorized to use.</p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Intelligence tools">
        {([
          ["contract", "Contract analysis"],
          ["simulator", "Payment simulator"],
          ["trust", "Client evidence"],
        ] as const).map(([id, label]) => (
          <button key={id} type="button" onClick={() => { setPanel(id); setResult(null); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${panel === id ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"}`}>
            {label}
          </button>
        ))}
      </nav>

      {panel === "contract" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Contract-to-Protection Analysis</h2>
            <p className="mt-1 text-sm text-slate-500">Paste contract text for term extraction and deterministic risk checks. PDF/DOCX text extraction is a separate upload integration.</p>
          </div>
          <div className="grid gap-4">
            <Field label="Project type"><input className={inputClass} value={projectType} onChange={(e) => setProjectType(e.target.value)} maxLength={100} /></Field>
            <Field label="Contract text" hint="Do not paste passwords, API keys, bank details, or unnecessary personal information.">
              <textarea className={`${inputClass} min-h-64`} value={contractText} onChange={(e) => setContractText(e.target.value)} maxLength={60000} placeholder="Paste the contract or statement of work here..." />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">{contractText.length.toLocaleString()} / 60,000 characters</span>
              <button className={buttonClass} disabled={busy || contractText.trim().length < 80} onClick={() => run("/api/intelligence/contract", { contractText, projectType })}>{busy ? "Analysing…" : "Analyse contract"}</button>
            </div>
          </div>
          <Result result={result} />
        </section>
      )}

      {panel === "simulator" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">What-if Payment Simulator</h2>
            <p className="mt-1 text-sm text-slate-500">All fees, exchange rates and withholding inputs are editable assumptions; they are not live PayPal quotes.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Contract amount"><input className={inputClass} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
            <Field label="Currency"><select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>{["USD", "EUR", "GBP", "INR", "CAD", "AUD", "SGD", "AED"].map((value) => <option key={value}>{value}</option>)}</select></Field>
            <Field label="FX rate to INR"><input className={inputClass} type="number" min="0.000001" step="any" value={fxRate} onChange={(e) => setFxRate(e.target.value)} /></Field>
            <Field label="Processing fee (%)"><input className={inputClass} type="number" min="0" max="20" step="0.01" value={feePercent} onChange={(e) => setFeePercent(e.target.value)} /></Field>
            <Field label="Fixed fee per transaction (foreign currency)"><input className={inputClass} type="number" min="0" step="0.01" value={fixedFee} onChange={(e) => setFixedFee(e.target.value)} /></Field>
            <Field label="FX spread (%)"><input className={inputClass} type="number" min="0" max="20" step="0.01" value={fxSpread} onChange={(e) => setFxSpread(e.target.value)} /></Field>
            <Field label="Withholding assumption (%)" hint="Enter only a rate you have verified for your situation."><input className={inputClass} type="number" min="0" max="50" step="0.01" value={withholding} onChange={(e) => setWithholding(e.target.value)} /></Field>
            <Field label="Annual cost of capital (%)"><input className={inputClass} type="number" min="0" max="100" step="0.1" value={capitalCost} onChange={(e) => setCapitalCost(e.target.value)} /></Field>
            <Field label="Work completed before first payment (%)"><input className={inputClass} type="number" min="0" max="100" step="1" value={workBeforePayment} onChange={(e) => setWorkBeforePayment(e.target.value)} /></Field>
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            <h3 className="font-semibold">Payment structures compared</h3>
            <p className="mt-1 text-xs text-slate-500">The first instalment in each scenario is treated as the first payment received for the exposure estimate.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-950"><strong>100% upfront</strong><p className="mt-1 text-slate-500">100% now · 0 days</p></div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-950"><strong>50 / 50</strong><p className="mt-1 text-slate-500">50% now · 50% in 30 days</p></div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-950"><strong>4 milestones</strong><p className="mt-1 text-slate-500">25% each · 0 / 15 / 30 / 45 days</p></div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className={buttonClass} disabled={busy} onClick={() => run("/api/intelligence/simulate", {
              amount, currency, fxRateToInr: number(fxRate), processingFeePercent: number(feePercent), fixedFeePerTransaction: number(fixedFee), fxSpreadPercent: number(fxSpread), withholdingPercent: number(withholding), annualCapitalCostPercent: number(capitalCost), workCompletedBeforeFirstPaymentPercent: number(workBeforePayment),
              scenarios: [
                { name: "100% upfront", installments: [{ sharePercent: 100, delayDays: 0 }] },
                { name: "50 / 50", installments: [{ sharePercent: 50, delayDays: 0 }, { sharePercent: 50, delayDays: 30 }] },
                { name: "4 milestones", installments: [{ sharePercent: 25, delayDays: 0 }, { sharePercent: 25, delayDays: 15 }, { sharePercent: 25, delayDays: 30 }, { sharePercent: 25, delayDays: 45 }] },
              ],
            })}>{busy ? "Calculating…" : "Compare payment structures"}</button>
          </div>
          <Result result={result} />
        </section>
      )}

      {panel === "trust" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Client Trust Intelligence</h2>
            <p className="mt-1 text-sm text-slate-500">Summarize only project and payment records you are authorized to use. This tool does not search the web or label anyone a fraudster.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client or business name"><input className={inputClass} value={clientName} onChange={(e) => setClientName(e.target.value)} maxLength={120} /></Field>
            <Field label="Evidence source"><input className={inputClass} value={evidenceSource} onChange={(e) => setEvidenceSource(e.target.value)} maxLength={300} /></Field>
            <Field label="Period covered"><input className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value)} maxLength={100} /></Field>
            <Field label="Completed projects"><input className={inputClass} type="number" min="0" max="10000" value={projectsCompleted} onChange={(e) => setProjectsCompleted(e.target.value)} /></Field>
            <Field label="On-time payments"><input className={inputClass} type="number" min="0" max="10000" value={paymentsOnTime} onChange={(e) => setPaymentsOnTime(e.target.value)} /></Field>
            <Field label="Late payments"><input className={inputClass} type="number" min="0" max="10000" value={paymentsLate} onChange={(e) => setPaymentsLate(e.target.value)} /></Field>
            <Field label="Disputes recorded"><input className={inputClass} type="number" min="0" max="10000" value={disputes} onChange={(e) => setDisputes(e.target.value)} /></Field>
            <Field label="Cancellations"><input className={inputClass} type="number" min="0" max="10000" value={cancellations} onChange={(e) => setCancellations(e.target.value)} /></Field>
            <Field label="Scope changes"><input className={inputClass} type="number" min="0" max="10000" value={scopeChanges} onChange={(e) => setScopeChanges(e.target.value)} /></Field>
          </div>
          <div className="mt-5 flex justify-end">
            <button className={buttonClass} disabled={busy || !clientName.trim()} onClick={() => run("/api/intelligence/client-trust", {
              clientName, evidenceSource, period, projectsCompleted: number(projectsCompleted), paymentsOnTime: number(paymentsOnTime), paymentsLate: number(paymentsLate), disputes: number(disputes), cancellations: number(cancellations), scopeChanges: number(scopeChanges),
            })}>{busy ? "Assessing…" : "Assess supplied evidence"}</button>
          </div>
          <Result result={result} />
        </section>
      )}

      <p className="text-xs leading-5 text-slate-500">Prototype notice: this starter page uses the API routes in this pack. Connect Supabase authentication, authorization, audit logging and rate limiting before exposing these endpoints to real users. Do not submit confidential contracts until your storage and AI-provider data handling are reviewed.</p>
    </main>
  );
}
