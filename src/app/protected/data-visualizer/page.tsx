"use client";

import { useState } from 'react';
import { CopilotKit } from "@copilotkit/react-core";
import DataVisualizerComponent from '@/components/DataVisualizerComponent';

export default function DataVisualizerPage() {
  const [visualizationData, setVisualizationData] = useState(null);

  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="datavisualizer_agent">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Data Visualizer</h1>
        <DataVisualizerComponent 
          onVisualizationGenerated={setVisualizationData}
        />
        {visualizationData && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Visualization Result</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(visualizationData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </CopilotKit>
  );
}
