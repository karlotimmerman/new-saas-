"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUsageData } from "@/hooks/useUsageData";

export function UsageContent() {
  const [workspace, setWorkspace] = useState<string>("All Workspaces");
  const [apiKey, setApiKey] = useState("All API keys");
  const [model, setModel] = useState("All Models");

  const { data: usageData, isLoading, error } = useUsageData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!usageData) return <div>No data available</div>;

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleExport}>
          Export
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={workspace} onValueChange={setWorkspace}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Workspaces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Workspaces">All Workspaces</SelectItem>
            {/* Add more workspaces as needed */}
          </SelectContent>
        </Select>
        <Select value={apiKey} onValueChange={setApiKey}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All API keys" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All API keys">All API keys</SelectItem>
            {/* Add more API keys as needed */}
          </SelectContent>
        </Select>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Models" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Models">All Models</SelectItem>
            {/* Add more models as needed */}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>{new Date().toLocaleString("default", { month: "long" })}</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select defaultValue="None">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Group by: None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">Group by: None</SelectItem>
            {/* Add more grouping options as needed */}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total tokens in</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {usageData.totalTokensIn.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total tokens out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {usageData.totalTokensOut.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daily token usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData.dailyUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tokens" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
