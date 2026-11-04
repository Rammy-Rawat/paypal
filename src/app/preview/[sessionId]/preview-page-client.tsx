"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { Shield, AlertTriangle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { verifyPreviewSession } from "@/lib/security/session-manager";
import { ClientPreviewView } from "./client-view";

function PreviewContent({ sessionId }: { sessionId: string }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const verification = useMemo(
    () => verifyPreviewSession(sessionId, token),
    [sessionId, token]
  );

  if (!verification.authorized || !verification.session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          {verification.status === "SESSION_NOT_FOUND" && (
            <>
              <XCircle className="w-12 h-12 text-red-400 mx-auto" />
              <h1 className="text-lg font-bold text-white">
                Session Not Found
              </h1>
              <p className="text-sm text-slate-400">
                This preview session does not exist. The link may be incorrect or
                the session may have been deleted.
              </p>
            </>
          )}

          {verification.status === "SESSION_REVOKED" && (
            <>
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
              <h1 className="text-lg font-bold text-white">
                Session Revoked
              </h1>
              <p className="text-sm text-slate-400">
                {verification.error}
              </p>
            </>
          )}

          {verification.status === "SESSION_EXPIRED" && (
            <>
              <Clock className="w-12 h-12 text-slate-500 mx-auto" />
              <h1 className="text-lg font-bold text-white">
                Session Expired
              </h1>
              <p className="text-sm text-slate-400">
                {verification.error}
              </p>
            </>
          )}

          {verification.status === "TOKEN_MISMATCH" && (
            <>
              <Shield className="w-12 h-12 text-red-400 mx-auto" />
              <h1 className="text-lg font-bold text-white">
                Unauthorized Access
              </h1>
              <p className="text-sm text-slate-400">
                The session token is invalid. You are not authorized to view this
                preview. Please request a new link from the seller.
              </p>
            </>
          )}

          <Link
            href="/projects"
            className="inline-block mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            &larr; Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 max-w-6xl mx-auto">
      <ClientPreviewView initialSession={verification.session} />
    </div>
  );
}

export function PreviewPageClient({ sessionId }: { sessionId: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-slate-400 text-sm animate-pulse">
            Verifying preview session…
          </div>
        </div>
      }
    >
      <PreviewContent sessionId={sessionId} />
    </Suspense>
  );
}
