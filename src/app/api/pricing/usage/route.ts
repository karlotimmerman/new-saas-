import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from a database or external API
  const usageData = {
    totalTokensIn: 1500000,
    totalTokensOut: 750000,
    dailyUsage: [
      { date: "Oct 01", tokens: 50000 },
      { date: "Oct 06", tokens: 75000 },
      { date: "Oct 11", tokens: 100000 },
      { date: "Oct 16", tokens: 80000 },
      { date: "Oct 21", tokens: 95000 },
    ]
  }

  return NextResponse.json(usageData)
}