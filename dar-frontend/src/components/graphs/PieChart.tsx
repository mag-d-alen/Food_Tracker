import { useMemo, useRef } from "react";
import * as d3 from "d3";
import { Slice } from "../common/Slice";
import { HEIGHT, WIDTH } from "../../app/constants";

export type DataItem = {
  name: string;
  value: number;
};
type PieChartProps = {
  data: DataItem[];
};

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"];

export const PieChart = ({ data }: PieChartProps) => {
  const ref = useRef(null);

  //translate data to pie; a slice is a d3 PieArcDatum object
  const pie = useMemo(() => {
    const pieGenerator = d3
      .pie<any, DataItem>()
      .value((d) => d.value || 0)
      .sort(null); // Do not apply any sorting, respect the order of the provided dataset
    return pieGenerator(data);
  }, [data]);

  const allPaths = pie.map((slice, i) => {
    return <Slice key={i} slice={slice} color={colors[i]} ref={ref} />;
  });

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ display: "inline-block" }}>
      <g
        transform={`translate(${WIDTH / 2}, ${HEIGHT / 2})`}
        className={"container"}
        ref={ref}
      >
        {ref.current ? allPaths : null}
      </g>
    </svg>
  );
};
