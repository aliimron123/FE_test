"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BarData {
  name: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarData[];
  color?: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, color = "#60a5fa" }) => {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          style={{ outline: "none", border: "none" }}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 45,
          }}
        >
          <XAxis dataKey="name" tick={{ fontSize: 12 }} textAnchor="middle" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
