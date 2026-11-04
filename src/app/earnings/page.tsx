import { Calculator, TrendingUp, Info, HelpCircle } from "lucide-react";
import Link from "next/link";
import { MOCK_EARNINGS_PREVIEW } from "@/lib/supabase/mock-data";
import { formatCurrency, formatINR } from "@/lib/utils";

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Module M: Global Currency, Fees &amp; Net Earnings Engine
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Planned for Phase 5
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculate what you actually keep in INR after PayPal cross-border fees, currency conversion spreads, and GST/TDS provisions.
          </p>
        </div>
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
          &larr; Back to Overview
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Simulator Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Payment Parameters</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Client Remittance Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  defaultValue={1000}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-white font-mono"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Currency Pair</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200" disabled>
                <option>USD &rarr; INR (United States to India)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Export Status (GST)</label>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 flex items-center justify-between">
                <span>LUT Active (0% IGST)</span>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">Compliant</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
              In Phase 5, this panel will let you toggle currencies, enter custom fee tiers, and compare actual PayPal settlement amounts with pre-project estimates.
            </p>
          </div>
        </div>

        {/* Right: Itemized Breakdown Card */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Estimated Net Settlement</span>
              <p className="text-2xl font-bold text-emerald-400 mt-0.5">
                {formatINR(MOCK_EARNINGS_PREVIEW.estimated_final_take_home_inr)}
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400">Reference FX Rate:</span>
              <p className="font-mono text-slate-200 font-semibold">1 USD = &#8377;{MOCK_EARNINGS_PREVIEW.reference_fx_rate}</p>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 text-slate-200">
              <span>Gross Client Payment:</span>
              <span className="font-semibold text-white">USD 1,000.00</span>
            </div>
            <div className="flex justify-between py-1 text-rose-400">
              <span className="flex items-center gap-1">
                <span>Est. PayPal Merchant Fee (4.4% + $0.30):</span>
              </span>
              <span>- USD {MOCK_EARNINGS_PREVIEW.estimated_paypal_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-rose-400">
              <span className="flex items-center gap-1">
                <span>Est. FX Conversion Spread (~2.5%):</span>
              </span>
              <span>- USD {MOCK_EARNINGS_PREVIEW.estimated_conversion_spread_cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-300 border-t border-slate-800">
              <span>Converted Gross Amount:</span>
              <span>&#8377;80,411</span>
            </div>
            <div className="flex justify-between py-1 text-emerald-400">
              <span>GST on Export (with LUT):</span>
              <span>&#8377;0.00</span>
            </div>
            <div className="flex justify-between py-1 text-amber-300">
              <span>Illustrative Income Tax Provision (~5%):</span>
              <span>- &#8377;{MOCK_EARNINGS_PREVIEW.estimated_income_tax_provision}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm font-bold text-white border-t border-slate-700">
              <span>Estimated Net In-Pocket:</span>
              <span className="text-emerald-400">{formatINR(MOCK_EARNINGS_PREVIEW.estimated_final_take_home_inr)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Compliance Notice:</strong> PayMind is an estimation and record-keeping assistant, not a tax filing service or a substitute for a qualified Indian Chartered Accountant.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
