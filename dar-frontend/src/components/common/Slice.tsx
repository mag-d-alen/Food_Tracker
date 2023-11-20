import * as d3 from "d3";
import { animated, useSpring } from "react-spring";
import { DataItem } from "../graphs/PieChart";
import { forwardRef } from "react";
import { PieLegend } from "./PieLegend";
import { RADIUS } from "../../app/constants";
type SliceProps = {
  color: string;
  slice: d3.PieArcDatum<DataItem>;
};

export const Slice = forwardRef<SVGElement, SliceProps>(
  ({ slice, color }, ref) => {
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

    const label = `${slice.data.name} (${slice.value} kcal)`;

    return (
      <g
        className={"slice"}
        onMouseOver={() => {
          //@ts-ignore
          ref.current && ref.current.classList.add("hasHighlight");
        }}
        onMouseOut={() => {
          //@ts-ignore
          ref.current && ref.current.classList.remove("hasHighlight");
        }}
      >
        <animated.path
          //@ts-ignore
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
        <PieLegend slice={slice}>{label}</PieLegend>
      </g>
    );
  }
);
