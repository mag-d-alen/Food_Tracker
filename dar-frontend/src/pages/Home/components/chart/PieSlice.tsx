import * as d3 from "d3";
import { animated, useSpring } from "react-spring";
import { PieLegend } from "./PieLegend";
import { RADIUS } from "@/app/constants";
import { PieDataItem } from "./PieChart";
import "../../Home.css";
type SliceProps = {
  color: string;
  slice: d3.PieArcDatum<PieDataItem>;
};

export const PieSlice: React.FC<SliceProps> = ({ slice, color }) => {
  const arcPathGenerator = d3.arc();

  //adding animation to slice angles
  const springProps = useSpring({
    from: {
      pos: [0, 0] as [number, number],
    },
    to: {
      pos: [slice.startAngle, slice.endAngle] as [number, number],
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g className={"slice"}>
      <animated.path
        d={springProps.pos.to((start, end) => {
          return arcPathGenerator({
            innerRadius: 40,
            outerRadius: RADIUS,
            startAngle: start,
            endAngle: end,
          });
        })}
        fill={color}
      />
      <PieLegend slice={slice} />
    </g>
  );
};
