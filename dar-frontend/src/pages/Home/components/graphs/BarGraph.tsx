import * as d3 from "d3";
import { useMemo } from "react";
import { BarItem } from "./BarItem";
import { BAR_PADDING, HEIGHT, MARGIN, WIDTH } from "@/app/constants";

export type GraphProps = {
  bucketData: { name: string; value: number }[];
  maxValue: number;
  domain: string[];
  getBarData: (d: { name: string; value: number }) => void;
  width?: number;
  height?: number;
};

export const BarGraph: React.FC<GraphProps> = ({
  bucketData,
  domain,
  maxValue,
  getBarData,
  width = WIDTH,
  height = HEIGHT,
}) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis: the for meals since the barplot is horizontal

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(domain)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [boundsHeight, domain]);

  // X axis: the length of bar is the kcal intake

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxValue]).range([0, boundsWidth]);
  }, [boundsWidth, maxValue]);
  const allShapes = bucketData.map((d) => {
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }
    return (
      <BarItem
        handleBarClick={() => getBarData(d)}
        key={d.name + d.value}
        name={d.name}
        value={d.value}
        barHeight={yScale.bandwidth()}
        barWidth={xScale(d.value)}
        x={xScale(0)}
        y={y}
      />
    );
  });

  const grid = xScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={xScale(value)}
          x2={xScale(value)}
          y1={0}
          y2={boundsHeight}
          fill="white"
          stroke="white"
          opacity={0.2}
        />
        <text
          x={xScale(value)}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          fill="white"
          opacity={0.8}
        >
          {value} kcal
        </text>
      </g>
    ));

  return (
    <svg width={460} height={400} id="barchart">
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {grid}
        {allShapes}
      </g>
    </svg>
  );
};
