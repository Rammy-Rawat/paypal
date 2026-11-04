import { Settings, Shield, Database, Sparkles, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function SettingsPage() {
  const hasPayPalClientId = Boolean(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID &&
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "your-sandbox-client-id"
  );
  const hasPayPalSecret = Boolean(
    process.env.PAYPAL_CLIENT_SECRET &&
    process.env.PAYPAL_CLIENT_SECRET !== "your-sandbox-client-secret"
  );
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY !== "your-gemini-api-key"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Settings &amp; Integrations Health
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review API connection statuses, sandbox credentials, and sponsor platform configurations.
          </p>
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
          &larr; Back to Overview
        </Link>
      </div>

      {/* Integration Status Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-semibold text-white">Core System Credentials</h2>
        
        <div className="space-y-4">
          {/* Item 1: PayPal Developer Sandbox */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">PayPal Developer Sandbox</h3>
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1.5 py-0.2 rounded font-mono font-bold">
                    Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Orders v2 API &amp; Webhook HMAC Verification
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasPayPalClientId && hasPayPalSecret ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                  <AlertTriangle className="w-3.5 h-3.5" /> Ready for Sandbox Keys (Phase 3)
                </span>
              )}
            </div>
          </div>

          {/* Item 2: Supabase Database */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">Supabase PostgreSQL &amp; Auth</h3>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-mono font-bold">
                    Persistence
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Row-Level Security (RLS) tables &amp; Deliverable Storage
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSupabaseConfigured ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live PostgreSQL Connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-800 border border-slate-700 px-2.5 py-1 rounded">
                  Local Demo Fallback Active
                </span>
              )}
            </div>
          </div>

          {/* Item 3: Gemini AI API */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">Google Gemini AI Engine</h3>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.2 rounded font-mono font-bold">
                    Intelligence
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Contract Clause Extraction &amp; Scam Heuristic Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasGeminiKey ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                  <AlertTriangle className="w-3.5 h-3.5" /> Ready for API Key (Phase 2)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sponsor Technologies Tracker */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Sponsor Technologies &amp; Hackathon Tool Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-semibold text-white block">AG Grid Community</span>
                <span className="text-[11px] text-slate-400">Interactive Payment &amp; Milestone Ledger</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                Implemented &amp; Active
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-semibold text-white block">Postman</span>
                <span className="text-[11px] text-slate-400">PayPal REST &amp; Webhook Collections</span>
              </div>
              <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded font-bold">
                Phase 3 QA
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-semibold text-white block">Kernel</span>
                <span className="text-[11px] text-slate-400">Isolated Web Deliverable Preview Sandbox</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded font-bold">
                Phase 6 Preview
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-semibold text-white block">Render</span>
                <span className="text-[11px] text-slate-400">Production App &amp; Webhook Hosting</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded font-bold">
                Phase 8 Deployment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
