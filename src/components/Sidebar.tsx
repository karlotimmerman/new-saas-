"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  Sliders,
  Key,
  FileText,
  BarChart2,
  DollarSign,
} from "lucide-react";
import { routes } from "@/config/routes";

const navItems = [
  { name: "Dashboard", href: routes.adminDashboard, icon: LayoutDashboard },
  { name: "Details", href: routes.adminDashboard + "/details", icon: FileText },
  { name: "Members", href: routes.adminUsers, icon: Users },
  {
    name: "Workspaces",
    href: routes.adminDashboard + "/workspaces",
    icon: Briefcase,
  },
  {
    name: "Billing",
    href: routes.adminDashboard + "/billing",
    icon: CreditCard,
  },
  { name: "Limits", href: routes.adminDashboard + "/limits", icon: Sliders },
  { name: "API keys", href: routes.adminDashboard + "/api-keys", icon: Key },
  { name: "Logs", href: routes.adminDashboard + "/logs", icon: FileText },
  { name: "Usage", href: routes.adminDashboard + "/usage", icon: BarChart2 },
  { name: "Cost", href: routes.adminDashboard + "/cost", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            SKY DUST
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-muted font-medium",
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
