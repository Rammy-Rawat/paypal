"use client";

import Link from "next/link";
import { Shield, Plus } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export function Header() {
  const hasPayPalKey = Boolean(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID &&
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "your-sandbox-client-id"
  );

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950/90 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Title & Protection Subtitle */}
      <div className="flex items-center gap-3">
        <h1 className="text-xs font-semibold text-slate-200 tracking-tight">
          Payment &amp; Digital Work Protection
        </h1>
        <span className="text-[11px] text-slate-500 hidden sm:inline">&bull;</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Zero-trust client delivery &amp; PayPal verification
        </span>
      </div>

      {/* Verified Status Badges & Direct Action */}
      <div className="flex items-center gap-3">
        {/* PayPal Status */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium border ${
            hasPayPalKey
              ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
              : "bg-slate-900 text-slate-400 border-slate-800"
          }`}
        >
          <Shield className="w-3 h-3 text-sky-400" />
          <span>{hasPayPalKey ? "PayPal Sandbox Connected" : "PayPal Sandbox (Demo Data)"}</span>
        </div>

        {/* Action Button */}
        <Link
          href="/projects"
          className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Client Preview</span>
        </Link>
      </div>
    </header>
  );
}
