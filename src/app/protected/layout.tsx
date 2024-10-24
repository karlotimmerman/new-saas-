// src/app/protected/layout.tsx

import Link from "next/link";
import { CopilotKit } from "@copilotkit/react-core"; // Client-side library for CopilotKit
import { ReactNode, Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar"; // Custom Sidebar (Client Component)
import { SidebarProvider } from "@/components/ui/sidebar"; // Sidebar state management
import { CopilotSidebar } from "@copilotkit/react-ui"; // Copilot chat UI
import "@/styles/platform.css"; // Custom platform styles (extends globals.css)

// Define route-specific metadata for the platform layout
export const metadata = {
  title: 'SKY DUST CSRD AI PLATFORM',
  description: 'Your one stop for all your CSRD needs. We offer expertise as csrd consultants, together with AI copilot driven platform and train and upskill your team to help you navigate the complexities of CSRD.',
};

// Main PlatformLayout component for protected pages
export default function PlatformLayout({
  children, // Render the child pages inside the layout
}: {
  children: React.ReactNode;
}) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <SidebarProvider>
        <div className="flex h-screen">
          
          {/* Left Sidebar: AppSidebar */}
          <Suspense fallback={<div>Loading Sidebar...</div>}>
            <AppSidebar />
          </Suspense>

          {/* Main Content Area: Center */}
          <div className="flex-grow p-4 overflow-y-auto">
            <header className="flex h-16 items-center px-4">
              {/* Optional: Breadcrumbs or header components */}
            </header>

            {/* Render child pages (main content) */}
            {children}
          </div>

          {/* Right Sidebar: CopilotSidebar (Initially Closed) */}
          <Suspense fallback={<div>Loading Assistant...</div>}>
            <div className="w-80 shrink-0">
              <CopilotSidebar
                defaultOpen={false}            // Sidebar is initially closed
                instructions={"You are assisting the user as best as you can."}
                labels={{
                  title: "Assistant",
                  initial: "How can I help?",
                }}
              />
            </div>
          </Suspense>
          
        </div>
      </SidebarProvider>
    </CopilotKit>
  );
}
