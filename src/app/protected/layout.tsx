import React from "react";
import { PlatformSidebar } from "@/components/PlatformSidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <PlatformSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">{children}</div>
      </main>
    </div>
  );
}
