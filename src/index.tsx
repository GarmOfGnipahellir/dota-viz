import "./index.scss";

import { Component, ComponentChild, render } from "preact";
import { GraphRenderer } from "./graph";

function damageFactor(armor: number): number {
  return 1 - (0.06 * armor) / (1 + 0.06 * Math.abs(armor));
}

interface GraphProps {
  /** IMPORTANT: The name for each graph must be unique */
  name: string;
  width?: number;
  height?: number;
}

interface GraphState {
  renderer: GraphRenderer;
}

class Graph extends Component<GraphProps, GraphState> {
  constructor() {
    super();
  }

  componentDidMount(): void {
    let renderer = new GraphRenderer(`${this.props.name}-canvas`);
    this.setState({ renderer });
  }

  render(
    props?: Readonly<GraphProps>,
    state?: Readonly<GraphState>,
    context?: any
  ): ComponentChild {
    let width = props.width ?? 1000;
    let height = props.height ?? 600;

    return (
      <div style={{ width, height, margin: "auto" }}>
        <canvas id={`${props.name}-canvas`} width={width} height={height} />
      </div>
    );
  }
}

let App = (
  <>
    <Graph name="test" />
  </>
);

render(App, document.getElementById("app"));
