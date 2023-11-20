import { useSpring, animated } from "@react-spring/web";

type BarItemProps = {
  name: string;
  value: number;
  barHeight: number;
  barWidth: number;
  x: number;
  y: number;
  handleBarClick: (d: any) => void;
};

type AnimatedProps = {
  barWidth: number;
  value: number;
  valueOpacity: number;
  y: number;
};

export const BarItem = (props: BarItemProps) => {
  const { name, value, barHeight, barWidth, x, y, handleBarClick } = props;

  const springProps = useSpring<AnimatedProps>({
    // the 'from' properties will be used only to animate the initialization of the component
    // if you put nothing it will be initialized with the first prop that is provided
    from: {
      value: 0,
      barWidth: 0,
      valueOpacity: 0,
    },
    to: {
      value: value,
      barWidth: barWidth,
      valueOpacity: barWidth > 80 ? 1 : 0,
      y,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g>
      <animated.rect
        onClick={handleBarClick}
        x={x}
        y={springProps.y}
        width={springProps.barWidth}
        height={barHeight}
        opacity={0.7}
        stroke="#ebeb0679"
        fill="#ebeb0679"
        fillOpacity={0.75}
        strokeWidth={1}
        rx={1}
      />
      <animated.text
        x={x + 7}
        y={springProps.y?.to((y) => y + barHeight / 2)}
        textAnchor="start"
        alignmentBaseline="central"
        fontSize={12}
        fill={"white"}
      >
        {name.toLocaleUpperCase()}
      </animated.text>
    </g>
  );
};
