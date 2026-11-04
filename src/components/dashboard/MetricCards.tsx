import { DollarSign, ShieldCheck, AlertOctagon, PackageCheck } from "lucide-react";
import { formatCurrency, formatINR } from "@/lib/utils";

interface MetricCardsProps {
  totalProtectedUsd: number;
  totalInrEstimated: number;
  activeOrdersCount: number;
  scamsInterceptedCount: number;
  passportsIssuedCount: number;
}

export function MetricCards({
  totalProtectedUsd = 3200,
  totalInrEstimated = 276480,
  activeOrdersCount = 2,
  scamsInterceptedCount = 1,
  passportsIssuedCount = 1,
}: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Net Protected Volume */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Net Protected Inflow</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white tracking-tight">
            {formatCurrency(totalProtectedUsd, "USD")}
          </p>
          <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <span>&asymp; {formatINR(totalInrEstimated)} Net Settled</span>
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
          Cross-border rate verified via PayMind Calculator
        </div>
      </div>

      {/* Metric 2: PayPal Sandbox Orders */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">PayPal Sandbox Orders</span>
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white tracking-tight">
            {activeOrdersCount} Active
          </p>
          <p className="text-xs text-sky-400 font-medium mt-1">
            1 Paid &bull; 1 Under Client Review
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
          Server-side Orders v2 verified
        </div>
      </div>

      {/* Metric 3: Scam Defense Interceptions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Scam Guard Alerts</span>
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-rose-400 tracking-tight">
            {scamsInterceptedCount} Intercepted
          </p>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Fake fee extortion blocked
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
          PayPal API cross-checked with 0 server records
        </div>
      </div>

      {/* Metric 4: Deliverables & Passports */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Delivery Passports</span>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <PackageCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white tracking-tight">
            {passportsIssuedCount} Issued
          </p>
          <p className="text-xs text-indigo-400 font-medium mt-1">
            100% checks passed &bull; SHA-256 hashed
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
          Client accepted &amp; handover signed
        </div>
      </div>
    </div>
  );
}
