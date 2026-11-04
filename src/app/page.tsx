import Link from "next/link";
import {
  FolderGit2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Eye,
  CheckCircle2,
  Lock,
  FileCheck2,
} from "lucide-react";
import { MOCK_PROJECTS, MOCK_PREVIEW_SESSIONS, MOCK_MILESTONES, MOCK_SCAM_ALERT } from "@/lib/supabase/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function OverviewPage() {
  const activeSession = MOCK_PREVIEW_SESSIONS[0];
  const pendingMilestones = MOCK_MILESTONES.filter((m) => m.status !== "paid");

  return (
    <div className="space-y-6">
      {/* Top Context & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-850 rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Protection &amp; Delivery Overview
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Demo Data Loaded
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking active client deliverables, PayPal payment confirmations, and zero-trust preview sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
          >
            <span>Manage Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Focused Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Projects</span>
            <FolderGit2 className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">2</p>
          <p className="text-[11px] text-slate-500 mt-1">
            1 in client review &bull; 1 active
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Awaiting Payment</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-300 mt-2">
            {formatCurrency(1200, "USD")}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Milestone 2 awaiting client release
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Secure Previews</span>
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">1 Active</p>
          <p className="text-[11px] text-indigo-400 mt-1">
            Time-limited token &bull; Watermarked
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Protection Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-bold text-rose-400 mt-2">1 Caught</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Advance-fee scam intercepted
          </p>
        </div>
      </div>

      {/* Client Review Notification Banner */}
      {activeSession && (
        <div className="bg-sky-950/30 border border-sky-800/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-300">
                  Client Review Session Active
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-900/60 text-sky-200 border border-sky-700/50">
                  {activeSession.client_name}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Milestone 2 deliverable is under active review. The client has access to an isolated, watermarked preview without source code exposure.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/preview/${activeSession.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              <span>Open Client Preview Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Projects & Payments (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Projects */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Active Projects</h2>
                <p className="text-xs text-slate-400">Delivery progress and contract protection status</p>
              </div>
              <Link
                href="/projects"
                className="text-xs text-sky-400 hover:text-sky-300 font-medium"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{proj.title}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
                          {proj.client_name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{proj.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-sky-400">
                        {formatCurrency(proj.total_amount, proj.currency)}
                      </span>
                      <span className={`block text-[10px] font-semibold uppercase ${
                        proj.status === "in_review" ? "text-amber-400" : "text-emerald-400"
                      }`}>
                        {proj.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Milestones Completed</span>
                      <span>{proj.id === "proj_001" ? "1 of 3 (33%)" : "0 of 2 (0%)"}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-sky-500 h-1.5 rounded-full"
                        style={{ width: proj.id === "proj_001" ? "33%" : "10%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Action link */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-850 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Protection level: <strong className="text-slate-300 capitalize">{proj.protection_level}</strong>
                    </span>
                    <Link
                      href={`/projects`}
                      className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
                    >
                      <span>Manage Milestones</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments Awaiting Confirmation */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Upcoming &amp; Pending Milestones</h2>
                <p className="text-xs text-slate-400">PayPal Sandbox orders awaiting completion or verification</p>
              </div>
              <Link
                href="/payments"
                className="text-xs text-sky-400 hover:text-sky-300 font-medium"
              >
                Payments Ledger &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">Milestone</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">PayPal Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {pendingMilestones.map((ms) => (
                    <tr key={ms.id} className="hover:bg-slate-850/40">
                      <td className="px-3 py-2.5 font-medium text-slate-200">
                        {ms.title}
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-sky-400">
                        {formatCurrency(ms.amount, ms.currency)}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          ms.status === "under_client_review"
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {ms.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        {ms.paypal_status === "APPROVED" ? (
                          <span className="text-amber-300 flex items-center gap-1 font-mono text-[11px]">
                            <Clock className="w-3 h-3" /> Sandbox Approved
                          </span>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">
                            Not Created
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Active Client Preview & Audit Stream (1 col) */}
        <div className="space-y-6">
          {/* Active Preview Snapshot */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Client Preview Controls</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-medium">
                Active Session
              </span>
            </div>

            <div className="bg-slate-950/70 rounded-lg p-3.5 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="text-slate-200 font-medium">{activeSession.client_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deliverable:</span>
                <span className="text-slate-200 font-mono text-[11px]">{activeSession.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Watermark:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Dynamic Overlay
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Source Inspection:</span>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Dual-Consent Req.
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Access Count:</span>
                <span className="text-sky-400 font-mono font-semibold">{activeSession.access_count} views</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href={`/preview/${activeSession.id}`}
                className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Simulate Client Preview</span>
              </Link>
            </div>
          </div>

          {/* Security Alert Snapshot */}
          <div className="bg-slate-900/70 border border-rose-500/20 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Security Defense Log
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>{MOCK_SCAM_ALERT.verdict}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Advance-fee fraud claiming $2,500 deposited. Blocked because no transaction exists on the PayPal server ledger.
            </p>
            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/protection"
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
              >
                <span>Protection Center</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Recent Activity Audit Trail */}
          <div className="bg-slate-900/70 border border-slate-850 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            <div className="space-y-3">
              {activeSession.audit_logs.slice(0, 3).map((log, idx) => (
                <div key={idx} className="text-xs space-y-0.5 border-l-2 border-slate-700 pl-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                    <span className="uppercase text-slate-400">{log.actor}</span>
                  </div>
                  <p className="text-slate-300 font-medium text-xs">{log.action.replace(/_/g, " ")}</p>
                  <p className="text-slate-400 text-[11px]">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
