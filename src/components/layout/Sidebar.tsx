"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  FolderGit2,
  CreditCard,
  ShieldAlert,
  Calculator,
  Settings,
  Shield,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USER_PROFILE } from "@/lib/supabase/mock-data";

const navItems = [
  {
    name: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Contracts & Agreements",
    href: "/contracts",
    icon: FileCheck2,
  },
  {
    name: "Projects & Client Review",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    name: "Protection Center",
    href: "/protection",
    icon: ShieldAlert,
  },
  {
    name: "Earnings & Tax",
    href: "/earnings",
    icon: Calculator,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-850 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-850">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">PayMind</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Freelancer Protection Platform</p>
            </div>
          </Link>
        </div>

        {/* Primary Navigation - 7 Focused Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Match exactly or subpaths (e.g. /projects/proj_001)
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "bg-slate-800/90 text-white font-semibold border border-slate-700/60"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-sky-400" : "text-slate-500"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User / Exporter Context Footer */}
      <div className="p-4 border-t border-slate-850 bg-slate-950/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Freelancer Context
          </span>
          <span className="text-[10px] bg-slate-800 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-medium">
            GST LUT 0%
          </span>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-slate-200 truncate">
              {MOCK_USER_PROFILE.full_name}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {MOCK_USER_PROFILE.business_name}
            </p>
          </div>
          <Link
            href="/settings"
            className="text-slate-500 hover:text-slate-300 p-1"
            title="Settings"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
