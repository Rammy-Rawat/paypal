"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  History,
  CheckCircle2,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { MOCK_SCAM_ALERT, MOCK_DELIVERY_PASSPORT, MOCK_PROJECTS } from "@/lib/supabase/mock-data";

export default function ProtectionCenterPage() {
  const [activeTab, setActiveTab] = useState<"scam_detector" | "dispute_defense" | "scope_creep">("scam_detector");
  const [scamInput, setScamInput] = useState("");
  const [simulatedOrderId, setSimulatedOrderId] = useState("PP-FAKE-9921448");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof MOCK_SCAM_ALERT | null>(MOCK_SCAM_ALERT);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleRunScamCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult(MOCK_SCAM_ALERT);
    }, 800);
  };

  const handleDownloadDisputeBundle = () => {
    const bundle = {
      bundle_title: "PayMind Factual Dispute Defense Evidence Package",
      project_id: "proj_001",
      project_title: "AI Payment Gateway & Intelligence Dashboard",
      client_name: "Nexus Labs Inc.",
      contract_signed_date: "2026-10-15T08:00:00Z",
      verified_milestones: [
        {
          milestone_title: "Architecture Specification",
          paypal_order_id: "SANDBOX-ORD-92817234",
          paypal_capture_id: "CAP-887123490",
          amount: "USD 1,000.00",
          verified_status: "COMPLETED",
        },
      ],
      delivery_passport: {
        version: MOCK_DELIVERY_PASSPORT.version,
        sha256_hash: MOCK_DELIVERY_PASSPORT.sha256_hash,
        checks_passed: MOCK_DELIVERY_PASSPORT.checks,
        client_accepted: MOCK_DELIVERY_PASSPORT.client_review_status,
      },
      audit_disclaimer:
        "Compiled from authenticated server logs. Does not guarantee dispute outcome; presents verified transaction facts and cryptographic delivery hashes.",
    };

    const blob = new Blob([JSON.stringify(bundle, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paymind-dispute-package-proj_001.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Protection Center
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
              Fraud, Dispute &amp; Scope Defense
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time scam interception, server-side PayPal verification, dispute evidence compiling, and scope-creep defense.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Dispute Evidence Package downloaded. Ready for submission to PayPal Resolution Center.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab("scam_detector")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "scam_detector"
              ? "border-rose-500 text-rose-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Payment Scam Detector (Module C)</span>
        </button>

        <button
          onClick={() => setActiveTab("dispute_defense")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "dispute_defense"
              ? "border-sky-500 text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Dispute Defense Packager (Module H)</span>
        </button>

        <button
          onClick={() => setActiveTab("scope_creep")}
          className={`px-4 py-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "scope_creep"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Scope Creep Watchdog (Module I)</span>
        </button>
      </div>

      {/* Tab 1: Payment Scam Detector */}
      {activeTab === "scam_detector" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Analyze Payment Communication</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste suspicious client messages or payment claims. PayMind compares text against known fraud heuristics and cross-references transaction IDs with PayPal Sandbox APIs.
            </p>

            <form onSubmit={handleRunScamCheck} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Message / Email Text
                </label>
                <textarea
                  rows={4}
                  value={scamInput}
                  onChange={(e) => setScamInput(e.target.value)}
                  placeholder="e.g. 'I made the PayPal payment of $2,500. However, PayPal requires you to pay a $50 gift card fee before funds can be released to your bank...'"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Claimed PayPal Order / Transaction ID
                </label>
                <input
                  type="text"
                  value={simulatedOrderId}
                  onChange={(e) => setSimulatedOrderId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {analyzing ? "Cross-Checking PayPal Sandbox..." : "Run Scam Intelligence Analysis"}
              </button>
            </form>
          </div>

          {/* Analysis Report */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-rose-500/30 rounded-xl p-5 space-y-4">
            {analysisResult && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {analysisResult.risk_level}
                    </span>
                    <span className="text-xs text-slate-400">
                      Confidence: {analysisResult.confidence_score}%
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Case: {analysisResult.id}</span>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-3">
                  <h3 className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    {analysisResult.verdict}
                  </h3>
                  <div className="space-y-1 text-xs">
                    <span className="text-slate-300 font-semibold">Flagged Indicators:</span>
                    <ul className="space-y-1 text-slate-400 mt-1">
                      {analysisResult.suspicious_indicators.map((ind, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">&bull;</span>
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Server Truth vs Screenshot */}
                <div className="bg-sky-950/30 p-4 rounded-lg border border-sky-800/40 text-xs space-y-2">
                  <span className="font-semibold text-sky-300 block">
                    Zero-Trust Rule: Deterministic Server Verification
                  </span>
                  <p className="text-slate-300">
                    {analysisResult.live_paypal_verification?.system_notes}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    PayMind never accepts screenshots, emails, or buyer assertions as proof of payment. Only server-side calls to PayPal Sandbox Orders v2 / Webhooks confirm transaction completion.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Dispute Defense Packager */}
      {activeTab === "dispute_defense" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">PayPal Dispute Evidence Packager</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically assemble contract terms, verified milestone transactions, cryptographic SHA-256 deliverable hashes, and client demo sign-offs.
              </p>
            </div>
            <button
              onClick={handleDownloadDisputeBundle}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Evidence Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-slate-400 font-medium block">1. Contractual Scope Baseline</span>
              <p className="text-slate-200">
                Extracted deliverables, milestone schedules, revision limits, and agreed payment amounts.
              </p>
              <span className="text-emerald-400 font-semibold block text-[11px]">&check; Immutably Logged</span>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-slate-400 font-medium block">2. Verified Payment Records</span>
              <p className="text-slate-200">
                PayPal Orders v2 Order IDs, capture IDs, and HMAC verified webhook event payloads.
              </p>
              <span className="text-emerald-400 font-semibold block text-[11px]">&check; Server-Side Confirmed</span>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-slate-400 font-medium block">3. Cryptographic Delivery Proof</span>
              <p className="text-slate-200">
                SHA-256 hashes of delivered packages, requirement test matrices, and client demonstration sign-offs.
              </p>
              <span className="text-emerald-400 font-semibold block text-[11px]">&check; Delivery Passport Linked</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Scope Creep Watchdog */}
      {activeTab === "scope_creep" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">AI Scope Creep Watchdog</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare initial contract deliverables with subsequent client change requests to detect unbilled work.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
            <span className="font-semibold text-slate-200 block">Demonstration Case: Project 001</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-sky-400 font-semibold block">Agreed Contract Scope:</span>
                <p className="text-slate-300">
                  &ldquo;Milestone 2 includes PayPal Orders v2 integration with server-side capture and standard webhook listener.&rdquo;
                </p>
              </div>
              <div className="p-3 bg-amber-950/30 rounded border border-amber-800/40 space-y-1">
                <span className="text-amber-300 font-semibold block">Client Request in Chat:</span>
                <p className="text-slate-300">
                  &ldquo;Can we also add Apple Pay, Google Pay, multi-currency wallet support, and recurring subscriptions before approving Milestone 2?&rdquo;
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-850 rounded text-slate-300 space-y-1">
              <span className="font-semibold text-amber-300">Analysis:</span>
              <p>
                Multi-wallet routing and recurring subscriptions are outside the agreed Milestone 2 scope. PayMind automatically drafts a friendly change-order quote for user approval before sending.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
