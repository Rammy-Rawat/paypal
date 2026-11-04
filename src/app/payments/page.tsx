import { PaymentsTable } from "@/components/dashboard/PaymentsTable";
import { CreditCard, ShieldCheck, Webhook, Plus } from "lucide-react";
import Link from "next/link";
import { MOCK_INVOICES } from "@/lib/supabase/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Payments &amp; PayPal Ledger
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
              Module E &amp; G
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Server-side PayPal Orders v2 integration, webhook HMAC signature verification, and milestone disbursements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Configure Sandbox Keys &rarr;
          </Link>
        </div>
      </div>

      {/* Primary AG Grid Table */}
      <PaymentsTable />

      {/* Invoices List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Project Invoices</h3>
            <p className="text-xs text-slate-400">Linked to PayPal Milestone Orders</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-2.5">Invoice #</th>
                <th className="px-4 py-2.5">Amount</th>
                <th className="px-4 py-2.5">Due Date</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Paid At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-850/50">
                  <td className="px-4 py-3 font-mono text-sky-400">{inv.invoice_number}</td>
                  <td className="px-4 py-3 font-semibold text-white">{formatCurrency(inv.amount, inv.currency)}</td>
                  <td className="px-4 py-3 text-slate-400">{inv.due_date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      inv.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{inv.paid_at ? new Date(inv.paid_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
