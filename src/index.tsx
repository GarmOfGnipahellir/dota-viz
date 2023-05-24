import "./index.scss";

import {
  Attributes,
  Component,
  ComponentChild,
  ComponentChildren,
  Ref,
  render,
} from "preact";

function damageFactor(armor: number): number {
  return 1 - (0.06 * armor) / (1 + 0.06 * Math.abs(armor));
}

class Graph extends Component {
  constructor() {
    super()
  }

  componentDidMount(): void {
    
  }

  render(
    props?: Readonly<
      Attributes & { children?: ComponentChildren; ref?: Ref<any> }
    >,
    state?: Readonly<{}>,
    context?: any
  ): ComponentChild {
    return <canvas />;
  }
}

let App = (
  <>
    <div style={{ width: 1000, height: 600, margin: "auto" }}>
      <Graph />
    </div>
  </>
);

render(App, document.getElementById("app"));
