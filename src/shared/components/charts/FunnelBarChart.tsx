import type { CSSProperties } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface FunnelBarRow {
  name: string;
  value: number;
}

interface FunnelBarChartProps {
  data: FunnelBarRow[];
  barFill?: string;
  height?: number;
  tooltipStyle: CSSProperties;
  gridColor: string;
  axisColor: string;
  /** Recharts CartesianGrid: which line directions to draw */
  gridHorizontal?: boolean;
  gridVertical?: boolean;
  /** When true, numeric X axis is hidden (compact operational layout) */
  hideXAxis?: boolean;
  yAxisWidth?: number;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
  barRadius?: [number, number, number, number];
  barSize?: number;
  tooltipCursorFill?: string;
  /** When set, each bar uses its own fill; `barFill` is fallback */
  cellColors?: string[];
}

export function FunnelBarChart({
  data,
  barFill = "#6366f1",
  height = 300,
  tooltipStyle,
  gridColor,
  axisColor,
  gridHorizontal = false,
  gridVertical = true,
  hideXAxis = false,
  yAxisWidth,
  margin = { top: 5, right: 16, left: 20, bottom: 5 },
  barRadius = [0, 6, 6, 0],
  barSize = 28,
  tooltipCursorFill,
  cellColors,
}: FunnelBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={margin}>
        <CartesianGrid strokeDasharray="3 3" horizontal={gridHorizontal} vertical={gridVertical} stroke={gridColor} />
        <XAxis
          type="number"
          hide={hideXAxis}
          axisLine={false}
          tickLine={false}
          tick={{ fill: axisColor, fontSize: 11 }}
        />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fill: axisColor, fontSize: 11 }}
          width={yAxisWidth ?? 100}
        />
        <Tooltip cursor={{ fill: tooltipCursorFill }} contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill={barFill} radius={barRadius} barSize={barSize}>
          {cellColors?.length
            ? data.map((_, index) => <Cell key={`cell-${index}`} fill={cellColors[index % cellColors.length]} />)
            : null}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
