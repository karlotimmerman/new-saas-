import { NextResponse } from "next/server";

export async function GET() {
  // In a real application, you would fetch this data from a database or external API
  const costData = {
    totalCost: 40.87,
    dailyCosts: [
      { date: "Oct 01", cost: 0.5 },
      { date: "Oct 06", cost: 4 },
      { date: "Oct 11", cost: 2 },
      { date: "Oct 16", cost: 10.5 },
      { date: "Oct 21", cost: 4 },
    ],
  };

  return NextResponse.json(costData);
}
