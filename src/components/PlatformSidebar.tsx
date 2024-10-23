"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { routes } from "@/config/routes";

const navItems = [
  { name: "Dashboard", href: routes.dashboard, icon: LayoutDashboard },
  { name: "Users", href: routes.adminUsers, icon: Users },
  { name: "Settings", href: routes.settings, icon: Settings },
  { name: "Help", href: routes.about, icon: HelpCircle },
];

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Your Platform</h2>
      </div>
      <nav className="flex-1 px-3 py-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1",
              pathname === item.href && "bg-muted font-medium",
            )}
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-3 mt-auto">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href={routes.login}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  );
}
