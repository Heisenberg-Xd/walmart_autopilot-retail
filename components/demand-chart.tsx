"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DemandChartProps {
  data: Array<{
    date: string
    predicted: number
    actual?: number
    confidence: number
  }>
}

export function DemandChart({ data }: DemandChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              typeof value === "number" ? value.toLocaleString() : value,
              name === "predicted" ? "Predicted Demand" : name === "actual" ? "Actual Demand" : "Confidence",
            ]}
          />
          <Legend />
          <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeWidth={2} name="Predicted" />
          {data.some((d) => d.actual !== undefined) && (
            <Line type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={2} name="Actual" />
          )}
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#dc2626"
            strokeWidth={1}
            strokeDasharray="5 5"
            name="Confidence %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
