import { NextResponse } from "next/server";

export async function GET() {
  // In a real application, you would fetch this data from a database or external API
  const limitsData = {
    modelLimits: [
      {
        model: "Claude 3.5 Sonnet 2024-10-22",
        requestsPerMinute: 1000,
        tokensPerMinute: 80000,
        tokensPerDay: 2500000,
      },
      {
        model: "Claude 3.5 Sonnet 2024-06-20",
        requestsPerMinute: 1000,
        tokensPerMinute: 80000,
        tokensPerDay: 2500000,
      },
      {
        model: "Claude 3 Opus",
        requestsPerMinute: 1000,
        tokensPerMinute: 40000,
        tokensPerDay: 2500000,
      },
      {
        model: "Claude 3 Sonnet",
        requestsPerMinute: 1000,
        tokensPerMinute: 80000,
        tokensPerDay: 2500000,
      },
      {
        model: "Claude 2",
        requestsPerMinute: 1000,
        tokensPerMinute: 80000,
        tokensPerDay: 2500000,
      },
    ],
    spendLimit: {
      currentSpend: 150,
      monthlyLimit: 500,
      resetDate: "November 1, 2024",
    },
  };

  return NextResponse.json(limitsData);
}
