import { useMemo, useState, type CSSProperties } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  brightenHex,
  donutLegendStyle,
  donutSliceStroke,
  fillForTrainingStatusLabel,
  fillsByValueDescending,
  sequentialBrandPalette,
} from "@/shared/lib/chartDonut";

export interface NamedValueRow {
  name: string;
  value: number;
}

export type DonutPaletteMode = "sequential-by-value" | "training-status" | "custom";

interface DonutPieChartProps {
  data: NamedValueRow[];
  tooltipStyle: CSSProperties;
  /** Controla contraste de borda entre fatias e cor da legenda */
  isDark: boolean;
  paletteMode?: DonutPaletteMode;
  /** Usado apenas com paletteMode === "custom" (ciclo por índice) */
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  height?: number;
  showLegend?: boolean;
  /** Sobrescreve a cor média da legenda */
  legendTextColor?: string;
}

export function DonutPieChart({
  data,
  tooltipStyle,
  isDark,
  paletteMode = "sequential-by-value",
  colors = [],
  innerRadius = 64,
  outerRadius = 104,
  paddingAngle = 2,
  height = 300,
  showLegend = true,
  legendTextColor,
}: DonutPieChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const sliceStroke = donutSliceStroke(isDark);
  const legendStyle = useMemo(() => {
    const base = donutLegendStyle(isDark);
    if (legendTextColor) return { ...base, color: legendTextColor };
    return base;
  }, [isDark, legendTextColor]);

  const fills = useMemo(() => {
    const n = data.length;
    if (paletteMode === "training-status") {
      return data.map((d) => fillForTrainingStatusLabel(d.name, isDark));
    }
    if (paletteMode === "custom" && colors.length > 0) {
      return data.map((_, i) => colors[i % colors.length]);
    }
    const pal = sequentialBrandPalette(n, isDark);
    return fillsByValueDescending(
      data.map((d) => d.value),
      pal
    );
  }, [data, isDark, paletteMode, colors]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey="value"
          onMouseEnter={(_, i) => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                hoverIndex === index ? brightenHex(fills[index], 0.14) : fills[index]
              }
              stroke={sliceStroke}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        {showLegend && (
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
