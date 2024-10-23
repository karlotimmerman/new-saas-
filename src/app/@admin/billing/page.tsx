import { Suspense } from "react";
import { BillingContent } from "./BillingContent";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Billing | Admin Dashboard",
  description: "Manage your billing information and view invoices",
};

export default function BillingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>
      <Suspense fallback={<BillingSkeleton />}>
        <BillingContent />
      </Suspense>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
