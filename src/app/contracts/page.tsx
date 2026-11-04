"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  FileCheck2,
  Users,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { MOCK_CLIENTS } from "@/lib/supabase/mock-data";

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<"analysis" | "simulator" | "clients">("analysis");
  const [contractText, setContractText] = useState(
    `Software Development Agreement:
Freelancer will build the Cross-Border Payment Engine for Client Nexus Labs Inc.
Total Fee: $3,200 USD payable upon completion of entire project.
Client may request unlimited design revisions until completely satisfied.
Freelancer will provide 12 months free maintenance.`
  );
  const [extracted, setExtracted] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setExtracted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Contracts &amp; Agreements
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
              Module A, B &amp; D
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Contract analysis, milestone structuring, client reliability intelligence, and payment scenario simulations.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "analysis"
              ? "border-sky-500 text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Contract-to-Protection Engine (Module A)</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "simulator"
              ? "border-sky-500 text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>What-If Payment Simulator (Module D)</span>
        </button>

        <button
          onClick={() => setActiveTab("clients")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "clients"
              ? "border-sky-500 text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Client Trust Intelligence (Module B)</span>
        </button>
      </div>

      {/* Tab 1: Contract Analysis */}
      {activeTab === "analysis" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Paste Client Proposal / Contract</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              PayMind identifies missing terms, ambiguous acceptance criteria, unbalanced payment exposure, and suggests safer wording.
            </p>

            <form onSubmit={handleAnalyze} className="space-y-3 text-xs">
              <div>
                <textarea
                  rows={8}
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors"
              >
                Audit Contract Safeguards
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            {extracted ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Readiness Assessment
                    </span>
                    <h3 className="text-base font-bold text-amber-400 mt-0.5">
                      Readiness Score: 42 / 100 &bull; Unbalanced Exposure
                    </h3>
                  </div>
                  <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-bold uppercase">
                    High Risk Terms Flagged
                  </span>
                </div>

                {/* Flagged Risks */}
                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-slate-200 block">Flagged Unbalanced Terms:</span>
                  <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded-lg space-y-1.5 text-slate-300">
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&bull;</span>
                      <span><strong>Zero Upfront Deposit:</strong> 100% of the $3,200 payment is deferred until project completion, leaving you with 100% unpaid exposure during development.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&bull;</span>
                      <span><strong>Unlimited Revisions:</strong> &ldquo;Unlimited revisions until satisfied&rdquo; is a common source of scope creep and unpaid extra work.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&bull;</span>
                      <span><strong>Uncapped Maintenance:</strong> 12 months free maintenance represents excessive post-delivery liability without separate compensation.</span>
                    </p>
                  </div>
                </div>

                {/* Proposed Safer Milestones */}
                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-slate-200 block">AI Recommended Milestone Structure:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-sky-400 font-semibold block">Milestone 1 (30%)</span>
                      <span className="text-white font-bold block">$960 USD</span>
                      <p className="text-[11px] text-slate-400">Upfront deposit upon architecture approval</p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-sky-400 font-semibold block">Milestone 2 (40%)</span>
                      <span className="text-white font-bold block">$1,280 USD</span>
                      <p className="text-[11px] text-slate-400">Core deliverable demonstrated in PayMind</p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-sky-400 font-semibold block">Milestone 3 (30%)</span>
                      <span className="text-white font-bold block">$960 USD</span>
                      <p className="text-[11px] text-slate-400">Final handover &amp; Delivery Passport release</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  <strong>Notice:</strong> PayMind provides general drafting assistance and risk explanations, not legal advice. Contracts should be reviewed by qualified legal counsel.
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-slate-400 text-xs">
                Click &ldquo;Audit Contract Safeguards&rdquo; to extract deliverables, identify risk clauses, and suggest safe milestone structures.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: What-If Payment Simulator */}
      {activeTab === "simulator" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">What-If Payment Structure Simulator</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare payment schedules to calculate your unpaid financial exposure at each development phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="text-rose-400 font-bold uppercase text-[11px] block">High Risk Schedule</span>
              <h3 className="text-sm font-semibold text-white">100% on Final Delivery</h3>
              <p className="text-slate-400">Max unpaid exposure: <strong className="text-white">100% ($3,200)</strong></p>
              <p className="text-[11px] text-slate-500">If the client ghosts or disputes at the end, you lose all development time with zero compensation.</p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <span className="text-amber-400 font-bold uppercase text-[11px] block">Moderate Schedule</span>
              <h3 className="text-sm font-semibold text-white">50% Deposit / 50% Final</h3>
              <p className="text-slate-400">Max unpaid exposure: <strong className="text-white">50% ($1,600)</strong></p>
              <p className="text-[11px] text-slate-500">Deposit covers kickoff costs, but final handover remains vulnerable before the last 50% settles.</p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-400 font-bold uppercase text-[11px] block">PayMind Recommended</span>
              <h3 className="text-sm font-semibold text-white">30% / 40% / 30% Milestones</h3>
              <p className="text-slate-400">Max unpaid exposure: <strong className="text-emerald-400">30% ($960)</strong></p>
              <p className="text-[11px] text-slate-500">Limits unpaid exposure at each stage and matches deliveries to verified PayPal Sandbox transactions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Client Trust Intelligence */}
      {activeTab === "clients" && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-300">
            <strong>Privacy &amp; Least-Privilege Constraint:</strong> Trust scores are derived solely from your own authorized project records, verified dispute archives, and user-provided communications. PayMind never claims unrestricted access to a client&apos;s private global PayPal history.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_CLIENTS.map((client) => (
              <div key={client.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{client.country} &bull; {client.company}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    client.trust_level === "high"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : client.trust_level === "moderate"
                      ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {client.trust_level} Trust ({client.trust_score})
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">{client.name}</h3>
                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Completed Projects:</span>
                    <span>{client.completed_projects_count} of {client.total_projects_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recorded Disputes:</span>
                    <span>{client.dispute_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. Payment Delay:</span>
                    <span>{client.average_payment_delay_days} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
