"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  Eye,
  ShieldCheck,
  Clock,
  Lock,
  FileCheck2,
  ArrowRight,
  ExternalLink,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from "lucide-react";
import { MOCK_PROJECTS, MOCK_PREVIEW_SESSIONS } from "@/lib/supabase/mock-data";
import { PreviewSession } from "@/types/database.types";
import { formatCurrency } from "@/lib/utils";
import { generateSecureToken } from "@/lib/security/crypto-utils";
import { revokePreviewSession } from "@/lib/security/session-manager";

export default function ProjectsPage() {
  const [sessions, setSessions] = useState<PreviewSession[]>(MOCK_PREVIEW_SESSIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(MOCK_PROJECTS[0].id);
  const [deliverableTitle, setDeliverableTitle] = useState("Payment Gateway V2 Web Demo");
  const [allowSourceInspectionRequest, setAllowSourceInspectionRequest] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleRevokeSession = (sessionId: string) => {
    revokePreviewSession(sessionId, "usr_mock_001");
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "revoked" } : s))
    );
    setNotification(`Session ${sessionId} has been immediately revoked. Client access terminated.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = MOCK_PROJECTS.find((p) => p.id === selectedProject) || MOCK_PROJECTS[0];
    const secureToken = generateSecureToken("tok_sec");
    const sessionId = `prev_session_${Date.now().toString(36)}`;
    const newSession: PreviewSession = {
      id: sessionId,
      project_id: proj.id,
      milestone_id: "ms_003",
      project_title: proj.title,
      version: "v1.3.0-rc1",
      seller_id: "usr_mock_001",
      seller_name: "A. Raha (Raha Digital Systems)",
      client_name: proj.client_name,
      client_email: "client@nexuslabs.io",
      session_token: secureToken,
      status: "active",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      access_count: 0,
      allowed_parts: {
        interactive_preview: true,
        documentation: true,
        source_inspection_requestable: allowSourceInspectionRequest,
      },
      watermark_text: `${proj.client_name.toUpperCase()} • REF: ${proj.id} • CONFIDENTIAL ZERO-TRUST PREVIEW • EXPIRES IN 48H`,
      preview_content: {
        type: "web_app",
        title: deliverableTitle,
        description: "Interactive client demonstration build. Isolated execution.",
        entry_html: `<div style="padding:24px; font-family:sans-serif; background:#0f172a; color:#f8fafc; border-radius:8px;">
          <h3>Deliverable Build: ${deliverableTitle}</h3>
          <p>Running in an isolated sandbox iframe without host filesystem or credential access.</p>
        </div>`,
      },
      source_inspection: {
        enabled: false,
        seller_authorized: false,
        client_accepted_terms: false,
        terms_text: "Mutual Source-Code Inspection Agreement: Viewing code does not transfer intellectual property rights.",
      },
      demonstration: {
        id: `demo_${Date.now()}`,
        summary: "Requirement demonstration for Milestone review.",
        seller_confirmed: true,
        seller_confirmed_at: new Date().toISOString(),
        client_confirmed: false,
        requirements: [
          {
            id: "REQ-01",
            title: "Functional UI execution & responsiveness",
            status: "pending",
          },
          {
            id: "REQ-02",
            title: "API contract conformance",
            status: "pending",
          },
        ],
      },
      audit_logs: [
        {
          timestamp: new Date().toISOString(),
          action: "PREVIEW_SESSION_CREATED",
          actor: "seller",
          actor_name: "A. Raha",
          details: "Created time-limited preview session (48h expiry).",
        },
      ],
    };

    setSessions([newSession, ...sessions]);
    setShowCreateModal(false);
    setNotification(`Secure preview session created for ${proj.client_name}. Token active.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Projects &amp; Secure Client Review
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
              Zero-Trust Delivery
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Provide clients with controlled, watermarked preview access without releasing editable source files or private credentials.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Preview Session</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-sky-950/60 border border-sky-700/60 rounded-lg text-xs text-sky-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Controlled Client Preview Sessions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Active Client Preview Sessions
            </h2>
            <p className="text-xs text-slate-400">
              Time-limited, authenticated preview links with dynamic watermarking and mutual sign-off
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`bg-slate-950/70 border rounded-xl p-5 space-y-4 transition-all ${
                session.status === "active"
                  ? "border-slate-800"
                  : "border-slate-850 opacity-60"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {session.project_title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                      {session.version}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        session.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Client: <strong className="text-slate-300">{session.client_name}</strong> ({session.client_email}) &bull; Created {new Date(session.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {session.status === "active" && (
                    <>
                      <Link
                        href={`/preview/${session.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Client Preview Portal</span>
                      </Link>
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-colors"
                        title="Immediately revoke client access"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Revoke Access</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Session Security Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Watermarking</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Client Identifiers
                  </span>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Source Files</span>
                  <span className="text-sky-300 font-medium flex items-center gap-1 mt-0.5">
                    <Lock className="w-3.5 h-3.5 text-sky-400" /> Private by Default
                  </span>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Dual-Consent Inspection</span>
                  <span className="text-slate-300 font-medium mt-0.5 block">
                    {session.source_inspection.seller_authorized
                      ? "Seller Authorized"
                      : "Seller Authorization Required"}
                  </span>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Demonstration Status</span>
                  <span className="text-amber-300 font-medium mt-0.5 block">
                    {session.demonstration.seller_confirmed
                      ? "Seller Confirmed • Awaiting Client"
                      : "Pending Demonstration"}
                  </span>
                </div>
              </div>

              {/* Honest Security Disclaimer */}
              <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  Ordinary downloads and copy controls are disabled. As an honest security limitation, browser display cannot prevent external photographs or manual copying.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">All Projects</h2>
          <p className="text-xs text-slate-400">Contracts, deliverables, and payment associations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Client: <span className="text-slate-300 font-medium">{proj.client_name}</span>
                  </p>
                </div>
                <span className="text-sm font-bold text-sky-400">
                  {formatCurrency(proj.total_amount, proj.currency)}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Protection: <span className="text-slate-300 capitalize">{proj.protection_level}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-semibold">
                  {proj.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Preview Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Create Secure Preview Session</h3>
                <p className="text-xs text-slate-400 mt-0.5">Configure time-limited zero-trust preview access</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Select Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  {MOCK_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.client_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Deliverable Title / Version</label>
                <input
                  type="text"
                  value={deliverableTitle}
                  onChange={(e) => setDeliverableTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2">
                <span className="font-semibold text-slate-200 block">Preview Access Permissions:</span>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input type="checkbox" defaultChecked disabled className="rounded bg-slate-800 text-sky-500" />
                  <span>Interactive Sandboxed UI Preview (Always Isolated)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowSourceInspectionRequest}
                    onChange={(e) => setAllowSourceInspectionRequest(e.target.checked)}
                    className="rounded bg-slate-800 text-sky-500"
                  />
                  <span>Allow Client to Request Source-Code Inspection (Requires Dual-Consent)</span>
                </label>
              </div>

              <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-amber-300 text-[11px] leading-relaxed">
                <strong>Zero-Trust Guarantee:</strong> The preview will render inside a strictly isolated sandbox container with a dynamic client watermark. Raw git repositories and environment secrets remain completely private.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                >
                  Generate Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
