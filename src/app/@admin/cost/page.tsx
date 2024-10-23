import { Suspense } from "react";
import { CostContent } from "./CostContent";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Cost | Admin Dashboard",
  description: "View and analyze your cost data",
};

export default function CostPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cost</h1>
      <Suspense fallback={<CostSkeleton />}>
        <CostContent />
      </Suspense>
    </div>
  );
}

function CostSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}
