import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

interface GraphModel {
  width: number;
  height: number;
  zoomX: number;
  zoomY: number;
}

const GraphContext = createContext<GraphModel>({
  width: 200,
  height: 200,
  zoomX: 1.0,
  zoomY: 1.0,
});

interface GraphDiscreteFunctionProps {
  func: (input: number) => number;
  step: number;
}

export function GraphDiscreteFunction(props: GraphDiscreteFunctionProps) {
  const graph = useContext(GraphContext);
  const num = Math.ceil(graph.width / props.step);

  let points = [];
  for (let i = 0; i < num; i++) {
    let x = i * props.step;
    let y = props.func(x) * graph.height;
    points.push(`${x},${y}`);
  }

  return (
    <g>
      <polyline points={points.join(" ")} fill="none" stroke="#fff" />
    </g>
  );
}

interface GraphGridProps {
  stepX: number;
  stepY: number;
}

export function GraphGrid(props: GraphGridProps) {
  const graph = useContext(GraphContext);
  const numX = Math.ceil(graph.width / props.stepX);
  const numY = Math.ceil(graph.height / props.stepY);
  const minX = 0;
  const maxX = graph.width;
  const minY = 0;
  const maxY = graph.height;
  let vertical = [];
  for (let i = 0; i < numX; i++) {
    let x = i * props.stepX;
    vertical.push(<line x1={x} y1={minY} x2={x} y2={maxY} stroke="#262626" />);
  }
  let horizontal = [];
  for (let i = 0; i < numY; i++) {
    let y = i * props.stepY;
    horizontal.push(
      <line x1={minX} y1={y} x2={maxX} y2={y} stroke="#262626" />
    );
  }
  return (
    <g>
      {vertical}
      {horizontal}
    </g>
  );
}

interface GraphProps {
  children: ComponentChildren;
  width: number;
  height: number;
}

export function Graph(props: GraphProps) {
  let model: GraphModel = {
    width: props.width,
    height: props.height,
    zoomX: props.width / 40,
    zoomY: props.height / 2
  };
  return (
    <GraphContext.Provider value={model}>
      <svg
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.width} ${props.height}`}
        style={{ background: "#161616" }}
      >
        {props.children}
      </svg>
    </GraphContext.Provider>
  );
}
