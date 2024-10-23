import { Sidebar } from '@/components/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
