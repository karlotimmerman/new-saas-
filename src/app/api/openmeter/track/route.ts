import { NextResponse } from 'next/server'
import { OpenMeter } from '@openmeter/sdk'

const openmeter = new OpenMeter({
  baseUrl: 'https://openmeter.cloud',
  token: process.env.OPENMETER_API_KEY ?? '',
})
export async function POST() {
  try {
    await openmeter.events.ingest({
      id: '20fa227b-56e9-43d7-8c17-39c025b6632b',
      source: 'my-app',
      type: 'prompt',
      time: new Date('2024-10-23T00:20:02.336Z'),
      subject: 'customer-1',
      data: {
        tokens: "123",
        model: "model",
        type: "type"
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json({ success: false, error: 'Failed to track event' }, { status: 500 })
  }
}