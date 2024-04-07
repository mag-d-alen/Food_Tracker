import * as d3 from "d3";
import { PieDataItem } from ".";

export const PieLegend = ({
  slice,
}: {
  slice: d3.PieArcDatum<PieDataItem>;
}) => {
  const label = `${slice.data.name}: ${slice.data.value} kcal`;
  const arcPathGenerator = d3.arc();

  const labelInflectionInfo = {
    innerRadius: 100,
    outerRadius: 50,
    startAngle: slice.startAngle,
    endAngle: slice.endAngle,
  };
  const inflectionPoint = arcPathGenerator.centroid(labelInflectionInfo);

  const isRightLabel = inflectionPoint[0] > 0;
  const labelPosX = inflectionPoint[0] + (isRightLabel ? 1 : -1);
  const textAnchor = "start";
  return (
    <text
      x={labelPosX + (isRightLabel ? 1 : -1)}
      y={inflectionPoint[1]}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      fontSize={12}
      fontWeight={500}
      fill={"white"}>
      {label} 
    </text>
  );
};
