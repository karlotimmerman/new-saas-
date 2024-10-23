import { Suspense } from 'react'
import { LimitsContent } from './LimitsContent'
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: 'Limits | Admin Dashboard',
  description: 'View and manage your usage limits',
}

export default function LimitsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Limits</h1>
      <Suspense fallback={<LimitsSkeleton />}>
        <LimitsContent />
      </Suspense>
    </div>
  )
}

function LimitsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  )
}