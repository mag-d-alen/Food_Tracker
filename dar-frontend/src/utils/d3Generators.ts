import * as d3 from "d3";

export const pieGenerator = d3.pie<any, any>().value((d) => d.value);
export const arcPathGenerator = d3.arc();
