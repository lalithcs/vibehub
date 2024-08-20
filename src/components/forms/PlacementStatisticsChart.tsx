// src/components/PlacementStatisticsChart.tsx
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ChartData {
  year: string;
  value: number;
}

interface PlacementStatisticsChartProps {
  title: string;
  data: ChartData[];
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "#2563eb",
  },
};

const PlacementStatisticsChart: React.FC<PlacementStatisticsChartProps> = ({ title, data }) => {
  return (
    <div className="bg-grey shadow-md rounded-lg p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="value" fill="var(--color-value)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default PlacementStatisticsChart;
