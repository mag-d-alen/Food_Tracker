import { useMemo } from "react";
import * as d3 from "d3";
import { PieSlice } from "./PieSlice";
import { HEIGHT, WIDTH } from "@/app/constants";
import "../../Home.css";

export type PieDataItem = {
  name: string;
  value: number;
};

const colors = [
  "#9f4e0f",
  "#eb4504",
  "#de7326",
  "#ebb800",
  "#f49049",
  "#ffb784",
  "#ffcfa6",
];

export const PieChart = ({
  pieData,
  pieTitle,
}: {
  pieData: PieDataItem[];
  pieTitle: string;
}) => {
  const pieGenerator = useMemo(
    () =>
      d3
        .pie<PieDataItem>()
        .value((d) => d.value || 0)
        .sort(null),
    []
  );
  //translate data to pie; a slice is a d3 PieArcDatum object
  const pie: d3.PieArcDatum<PieDataItem>[] = pieGenerator(pieData);

  const allPaths = pie.map((slice, i) => {
    return <PieSlice key={i} slice={slice} color={colors[i]}  />;
  });
  return (
    <>
      <h3>{pieTitle}</h3>
      {pieData && pie ? (
        <svg width={WIDTH} height={HEIGHT} style={{ display: "inline-block" }}>
          <g
            transform={`translate(${WIDTH / 2}, ${HEIGHT / 2})`}
            className={"container"}>
            {allPaths}
          </g>
        </svg>
      ) : (
        <sub>click on a bar to see the meal's details</sub>
      )}
    </>
  );
};
