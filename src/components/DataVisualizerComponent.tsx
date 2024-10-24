import { useState } from 'react';
import { useCustomCopilotAction } from '@/hooks/useCopilotAction';
import { useCoAgent } from '@copilotkit/react-core';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";

interface DataVisualizerComponentProps {
  onVisualizationGenerated: (data: any /* TODO: Replace with specific type */) => void;
}

export default function DataVisualizerComponent({ onVisualizationGenerated }: DataVisualizerComponentProps) {
  const [dataInput, setDataInput] = useState('');
  const [chartType, setChartType] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[] | null>(null);

  const { executeAction, isLoading, error } = useCustomCopilotAction({
    name: 'generate_visualization', // This should match the node name in your CustomWorkflowManager
    description: 'Generate a data visualization based on input data',
  });

  const { state, setState } = useCoAgent({
    name: "datavisualizer_agent",
    initialState: {
      input: "",
      chartType: null,
      chartData: null,
    },
  });

  const handleVisualize = async () => {
    try {
      setState({ ...state, input: dataInput });
      const result = await executeAction(dataInput);
      setChartType(result.chartType);
      setChartData(result.chartData);
      onVisualizationGenerated(result);
    } catch (err) {
      console.error('Error generating visualization:', err);
    }
  };

  const renderChart = () => {
    if (!chartType || !chartData) return null;

    const config = {
      data: { label: "Data", color: "#2563eb" },
    };

    return (
      <ChartContainer className="h-[300px]" config={config}>
        {chartType === 'bar' && (
          <RechartsPrimitive.BarChart data={chartData}>
            <RechartsPrimitive.XAxis dataKey="name" />
            <RechartsPrimitive.YAxis />
            <RechartsPrimitive.Bar dataKey="value" fill="#2563eb" />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RechartsPrimitive.BarChart>
        )}
        {chartType === 'line' && (
          <RechartsPrimitive.LineChart data={chartData}>
            <RechartsPrimitive.XAxis dataKey="name" />
            <RechartsPrimitive.YAxis />
            <RechartsPrimitive.Line type="monotone" dataKey="value" stroke="#2563eb" />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RechartsPrimitive.LineChart>
        )}
        {/* Add more chart types as needed */}
      </ChartContainer>
    );
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
        placeholder="Enter your data here (e.g., CSV, JSON)"
        rows={10}
        className="w-full"
      />
      <Button onClick={handleVisualize} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Visualization'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
      {chartData && renderChart()}
    </div>
  );
}
