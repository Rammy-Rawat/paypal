import Link from "next/link";
import {
  FileText,
  Calculator,
  ShieldAlert,
  PackageCheck,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    title: "Contract Intelligence",
    description: "Audit client proposal, flag missing milestones & get safer contract wording.",
    href: "/contracts",
    icon: FileText,
    accent: "from-sky-500/20 to-sky-600/5 text-sky-400 border-sky-500/30",
    badge: "Module A",
  },
  {
    title: "USD &rarr; INR Earnings Calc",
    description: "Estimate net take-home after PayPal merchant fees, FX spread & GST LUT.",
    href: "/earnings",
    icon: Calculator,
    accent: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30",
    badge: "Module M",
  },
  {
    title: "Verify Payment Scam",
    description: "Scan fake screenshots or suspicious messages against live PayPal order APIs.",
    href: "/scam-detector",
    icon: ShieldAlert,
    accent: "from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/30",
    badge: "Module C",
  },
  {
    title: "Digital Delivery Passport",
    description: "Run requirement checks, compute SHA-256 integrity hash & log safe handover.",
    href: "/deliverables",
    icon: PackageCheck,
    accent: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30",
    badge: "Module J",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.title}
            href={act.href}
            className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br flex items-center justify-center border ${act.accent}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {act.badge}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mt-3 group-hover:text-white transition-colors">
                {act.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {act.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-medium text-sky-400 flex items-center gap-1">
              <span>Launch Module</span>
              <span>&rarr;</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
