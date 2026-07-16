"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Inbox,
  ClipboardList,
  Video,
  IdCard,
  Ticket,
  FileCheck,
  UserCheck,
  SearchCheck,
  CalendarCheck,
  Search,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Leads & Requests",
    items: [
      { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
      { href: "/admin/website-audit", label: "Website Audit", icon: Search },
      { href: "/admin/seo-audits", label: "SEO Audit", icon: SearchCheck },
      {
        href: "/admin/social-media-management",
        label: "Social Media Management",
        icon: Megaphone,
      },

      {
        href: "/admin/market-research",
        label: "Market Research",
        icon: SearchCheck,
      },
      {
        href: "/admin/demo-requirements",
        label: "Demo Website Requirements",
        icon: FileCheck,
      },
      {
        href: "/admin/client-assessment",
        label: "Client Assessment",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Surveys",
    items: [
      { href: "/admin/survey", label: "Survey", icon: ClipboardList },
      { href: "/admin/juantap-survey", label: "Juantap Survey", icon: IdCard },
      { href: "/admin/video-survey", label: "Video Survey", icon: Video },
    ],
  },
  {
    title: "Support",
    items: [
      {
        href: "/admin/support-tickets",
        label: "Support Tickets",
        icon: Ticket,
      },
    ],
  },
  {
    title: "HR",
    items: [
      {
        href: "/admin/attendance",
        label: "OJT Attendance",
        icon: CalendarCheck,
      },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsChecking(false);
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const isActive = (path: string) => pathname === path;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gradient-to-b from-cyan-900 to-blue-900 dark:from-cyan-950 dark:to-blue-950 text-white transition-transform duration-300 flex flex-col fixed left-0 top-0 h-full shadow-lg z-50 lg:translate-x-0 lg:sticky`}
      >
        <div className="p-4 border-b border-cyan-700/50 flex items-center justify-between">
          <h1 className="text-lg font-bold text-cyan-300">Admin</h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-cyan-800 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/70">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm leading-tight ${
                      isActive(href)
                        ? "bg-cyan-600 text-white"
                        : "hover:bg-cyan-800/50 text-cyan-100"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-cyan-700/50">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 h-9"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-auto">
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            Admin Dashboard
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
