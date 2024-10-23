'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLimitsData } from '@/hooks/useLimitsData'

export function LimitsContent() {
  const [showLegacyModels, setShowLegacyModels] = useState(false)
  const { data, isLoading, error } = useLimitsData()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>

  const { modelLimits, spendLimit } = data

  const handleChangeLimit = () => {
    // Implement change limit functionality
    console.log('Changing limit...')
  }

  const handleAddNotification = () => {
    // Implement add notification functionality
    console.log('Adding notification...')
  }

  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <Switch
          checked={showLegacyModels}
          onCheckedChange={setShowLegacyModels}
          id="show-legacy-models"
        />
        <label htmlFor="show-legacy-models">Show Legacy Models</label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>MODEL</TableHead>
            <TableHead>REQUESTS PER MINUTE</TableHead>
            <TableHead>TOKENS PER MINUTE</TableHead>
            <TableHead>TOKENS PER DAY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modelLimits.map((limit: { model: string; requestsPerMinute: number; tokensPerMinute: number; tokensPerDay: number }) => (
            <TableRow key={limit.model}>
              <TableCell>{limit.model}</TableCell>
              <TableCell>{limit.requestsPerMinute.toLocaleString()}</TableCell>
              <TableCell>{limit.tokensPerMinute.toLocaleString()}</TableCell>
              <TableCell>{limit.tokensPerDay.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Spend limits</h2>
        <p className="mb-4">You can manage your spend by setting monthly spend limits.</p>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Monthly limit</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(spendLimit.currentSpend / spendLimit.monthlyLimit) * 100} className="mb-2" />
            <div className="flex justify-between items-center">
              <span>${spendLimit.currentSpend.toFixed(2)} of ${spendLimit.monthlyLimit.toFixed(2)}</span>
              <Button variant="outline" onClick={handleChangeLimit}>Change Limit</Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Resets on {spendLimit.resetDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email notification</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Notify all admins when monthly spend reaches a certain amount</p>
            <Button className="mt-2" onClick={handleAddNotification}>Add notification</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}