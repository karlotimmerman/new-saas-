import { NextResponse } from "next/server";

export async function GET() {
  // In a real application, you would fetch this data from a database or external API
  const billingData = {
    creditBalance: 500.0,
    cardLastFour: "1234",
    autoReloadEnabled: true,
    invoices: [
      { period: "Oct 2024", amount: "US$ 250.00", status: "DRAFT" },
      { period: "Sep 2024", amount: "US$ 180.50", status: "ISSUED" },
      { period: "Aug 2024", amount: "US$ 210.75", status: "PAID" },
    ],
  };

  return NextResponse.json(billingData);
}
