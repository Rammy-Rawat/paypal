import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldX, Check } from "lucide-react";
import { MOCK_SCAM_ALERT } from "@/lib/supabase/mock-data";

export function ScamAlertBanner() {
  return (
    <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 rounded-xl p-5 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Icon & Description */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
            <ShieldX className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Critical Scam Intercepted
              </span>
              <span className="text-xs text-slate-400">
                Confidence: {MOCK_SCAM_ALERT.confidence_score}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 mt-1">
              Advance-Fee Extortion Detected on Purported $2,500 Payment
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Client sent an unverified payment confirmation claiming funds are &ldquo;on hold&rdquo; until you pay a $50 gift card fee. 
              <strong className="text-rose-300"> PayPal never requires third-party fees to release funds.</strong>
            </p>
            {/* Server-side verification pill */}
            <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-200 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded w-fit">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                <strong>Server Truth:</strong> Order ID{" "}
                <code className="font-mono bg-black/40 px-1 py-0.5 rounded">
                  {MOCK_SCAM_ALERT.paypal_order_id_found}
                </code>{" "}
                does not exist in PayPal Sandbox ledger.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <Link
            href="/scam-detector"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-sm shadow-rose-600/30"
          >
            <span>Inspect Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
