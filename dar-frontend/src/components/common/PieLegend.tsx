import * as d3 from "d3";

export const PieLegend = ({ slice, children }: any) => {
  const arcPathGenerator = d3.arc();

  const labelInflextionInfo = {
    innerRadius: 100,
    outerRadius: 50,
    startAngle: slice.startAngle,
    endAngle: slice.endAngle,
  };
  const inflexionPoint = arcPathGenerator.centroid(labelInflextionInfo);

  const isRightLabel = inflexionPoint[0] > 0;
  const labelPosX = inflexionPoint[0] + (isRightLabel ? 1 : -1);
  const textAnchor = "start";

  return (
    <text
      x={labelPosX + (isRightLabel ? 1 : -1)}
      y={inflexionPoint[1]}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      fontSize={12}
      fontWeight={500}
      fill={"white"}
    >
      {children}
    </text>
  );
};
