'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle } from 'lucide-react'
import { useBillingData } from '@/hooks/useBillingData'
import { logError } from '@/lib/logger'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define an interface for the invoice object
interface Invoice {
  period: string;
  amount: string;
  status: string;
}

export function BillingContent() {
  const { data: billingData, isLoading, error } = useBillingData()
  const [isProcessing, setIsProcessing] = useState(false)

  if (isLoading) return <div>Loading...</div>
  if (error) {
    logError('Failed to fetch billing data', error)
    return <div>An error occurred while fetching billing data. Please try again later.</div>
  }
  if (!billingData) return <div>No data available</div>

  const handleAddFunds = async () => {
    setIsProcessing(true)
    try {
      // Implement add funds functionality
      // For example:
      // await addFunds(amount)
      toast({
        title: "Funds added successfully",
        description: "Your balance has been updated.",
        variant: "default"
      })
    } catch (error) {
      logError('Failed to add funds', error)
      toast({
        title: "Error",
        description: "Failed to add funds. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEditAutoReload = async () => {
    setIsProcessing(true)
    try {
      // Implement edit auto reload functionality
      // For example:
      // await updateAutoReloadSettings(newSettings)
      toast({
        title: "Auto-reload settings updated",
        description: "Your new settings have been saved.",
        variant: "default"
      })
    } catch (error) {
      logError('Failed to update auto-reload settings', error)
      toast({
        title: "Error",
        description: "Failed to update auto-reload settings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleContactSales = async () => {
    setIsProcessing(true)
    try {
      // Implement contact sales functionality
      // For example:
      // await submitSalesInquiry(inquiryDetails)
      toast({
        title: "Sales inquiry submitted",
        description: "Our team will contact you shortly.",
        variant: "default"
      })
    } catch (error) {
      logError('Failed to submit sales inquiry', error)
      toast({
        title: "Error",
        description: "Failed to submit sales inquiry. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Billing Issue</AlertTitle>
        <AlertDescription>
          We have identified an issue resulting in some delayed events related to billing for requests to the Anthropic API and Console. This issue does not affect success rates on the API, but will result in delayed visibility on usage in the Console. All usage will still be billed as expected.
        </AlertDescription>
      </Alert>
      <h2 className="text-xl font-bold mb-4">Credit balance</h2>
      <p className="mb-4">Your credit balance will be consumed with API and Workbench usage. You can add funds directly or set up auto-reload thresholds.</p>
      <Card className="mb-6">
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div>
            <h3 className="text-2xl font-bold">US$ {billingData.creditBalance.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Remaining Balance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="mb-2">Charged to Mastercard •••• {billingData.cardLastFour}</p>
            <Button onClick={handleAddFunds} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Add Funds'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          {billingData.autoReloadEnabled ? (
            <span className="text-green-500">✓</span>
          ) : (
            <span className="text-red-500">×</span>
          )}
          <span>Auto reload is {billingData.autoReloadEnabled ? 'enabled' : 'disabled'}.</span>
        </div>
        <Button variant="outline" onClick={handleEditAutoReload} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Edit'}
        </Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>MONTHLY INVOICING</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contact the Anthropic accounts team to switch to monthly invoicing.</p>
          <Button className="mt-2" onClick={handleContactSales} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Contact Sales'}
          </Button>
        </CardContent>
      </Card>
      <h2 className="text-xl font-bold mb-4">Invoice History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PERIOD</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingData.invoices.map((invoice: Invoice, index: number) => (
            <TableRow key={index}>
              <TableCell>{invoice.period}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  invoice.status === 'DRAFT' ? 'bg-yellow-200 text-yellow-800' :
                  invoice.status === 'ISSUED' ? 'bg-green-200 text-green-800' :
                  'bg-blue-200 text-blue-800'
                }`}>
                  {invoice.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
