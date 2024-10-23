import React from 'react'
import { PlatformSidebar } from '@/components/PlatformSidebar'
import { ThemeToggle } from "@/components/ThemeToggle";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | SKY DUST AI',
  description: 'User dashboard for SKY DUST AI platform',
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <PlatformSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
