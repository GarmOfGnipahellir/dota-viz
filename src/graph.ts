import { CanvasForm, CanvasSpace, Pt } from "pts";

export class GraphRenderer {
  space: CanvasSpace;
  form: CanvasForm;

  view: GraphView;

  constructor(elem: string | Element) {
    this.space = new CanvasSpace(elem);
    this.space.setup({ bgcolor: "#111" });
    this.space.add({
      animate: () => this.animate(),
      action: (type, px, py, evt) => this.action(type, px, py, evt),
    });
    this.form = this.space.getForm();
    this.space.bindMouse().bindTouch().play();
  }

  animate() {
    let [space, form] = [this.space, this.form];

    let resolution = 100;
    let step = 1 / resolution;
    let pts = [];
    for (let i = 0; i < resolution; i++) {
      let x = i * step * space.width;
      let y = space.height - x;

      pts.push(new Pt(x, y));
    }

    form.fillOnly("#fff").points(pts, 2, "circle");

    let lines = [];
    for (let i = 1; i < pts.length; i++) {
      lines.push([pts[i - 1], pts[i]]);
    }

    form.strokeOnly("#fff").lines(lines);
  }

  action(type: string, px: number, py: number, evt: Event) {}
}

export class GraphView {
  viewX: number;
  viewY: number;

  viewWidth: number;
  viewHeight: number;

  graphWidth: number;
  graphHeight: number;

  offsetX: number;
  offsetY: number;

  viewToGraph(pt: Pt): Pt {
    return pt
      .$subtract(new Pt(this.viewX, this.viewY))
      .$divide(new Pt(this.viewWidth, this.viewHeight))
      .$multiply(new Pt(this.graphWidth, this.graphHeight))
      .$add(new Pt(this.offsetX, this.offsetY));
  }
}
