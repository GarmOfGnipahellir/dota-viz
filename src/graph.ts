import { CanvasForm, CanvasSpace, Pt, Rectangle } from "pts";

export class GraphRenderer {
  space: CanvasSpace;
  form: CanvasForm;

  view: GraphView;

  margins: Margins;
  resolution: number = 100;

  minTickStep: number = 50;

  constructor(elem: string | Element, margins?: Margins) {
    this.margins = margins ?? new Margins(50);

    this.space = new CanvasSpace(elem);
    this.space.setup({ bgcolor: "#111" });
    this.space.add({
      animate: () => this.animate(),
      action: (type, px, py, evt) => this.action(type, px, py, evt),
    });

    this.form = this.space.getForm();

    this.view = new GraphView(this.space, this.margins);

    this.space.bindMouse().bindTouch().play();
  }

  animate() {
    let [space, form] = [this.space, this.form];
    this.view = new GraphView(this.space, this.margins);

    let step = 1 / (this.resolution - 1);
    let pts = [];
    for (let i = 0; i < this.resolution; i++) {
      let x = i * step * this.view.viewSize.x + this.view.viewPos.x;
      x = this.view.viewToGraphX(x);
      let y = x;

      pts.push(this.view.graphToView(new Pt(x, y)));
    }

    form.fillOnly("#fff").points(pts, 2, "circle");

    let lines = [];
    for (let i = 1; i < pts.length; i++) {
      lines.push([pts[i - 1], pts[i]]);
    }

    form.strokeOnly("#fff").lines(lines);

    form
      .strokeOnly("#fff")
      .rect(Rectangle.fromTopLeft(this.view.viewPos, this.view.viewSize));

    let numTicksX = Math.floor(this.view.viewSize.x / this.minTickStep);
    let tickStepX = this.view.viewSize.x / (numTicksX - 1);
    for (let i = 0; i < numTicksX; i++) {
      let x = i * tickStepX + this.view.viewPos.x;
      let minY = this.view.viewSize.y + this.view.viewPos.y;
      let maxY = minY + 20;

      // tick line
      form.strokeOnly("#fff").line([new Pt(x, minY), new Pt(x, maxY)]);
      // grid line
      form
        .strokeOnly("#222")
        .line([
          new Pt(x, this.view.viewPos.y),
          new Pt(x, this.view.viewPos.y + this.view.viewSize.y),
        ]);
    }

    let numTicksY = Math.floor(this.view.viewSize.y / this.minTickStep);
    let tickStepY = this.view.viewSize.y / (numTicksY - 1);
    for (let i = 0; i < numTicksY; i++) {
      let y = i * tickStepY + this.view.viewPos.y;
      let maxX = this.view.viewPos.x;
      let minX = maxX - 20;

      // tick line
      form.strokeOnly("#fff").line([new Pt(minX, y), new Pt(maxX, y)]);
      // grid line
      form
        .strokeOnly("#222")
        .line([
          new Pt(this.view.viewPos.x, y),
          new Pt(this.view.viewPos.x + this.view.viewSize.x, y),
        ]);
    }
  }

  action(type: string, px: number, py: number, evt: Event) {}
}

export class Margins {
  left: number = 0;
  top: number = 0;
  right: number = 0;
  bottom: number = 0;

  constructor(
    allOrLeftRightOrLeft?: number,
    topBottomOrTop?: number,
    right?: number,
    bottom?: number
  ) {
    if (allOrLeftRightOrLeft == undefined) {
      return;
    }

    if (topBottomOrTop == undefined) {
      this.left = allOrLeftRightOrLeft;
      this.right = allOrLeftRightOrLeft;
      this.top = allOrLeftRightOrLeft;
      this.bottom = allOrLeftRightOrLeft;
      return;
    }

    if (right == undefined) {
      this.left = allOrLeftRightOrLeft;
      this.right = allOrLeftRightOrLeft;
      this.top = topBottomOrTop;
      this.bottom = topBottomOrTop;
      return;
    }

    this.left = allOrLeftRightOrLeft;
    this.top = topBottomOrTop;
    this.right = right;
    this.bottom = bottom ?? 0;
  }
}

export class GraphView {
  viewPos: Pt = new Pt();
  viewSize: Pt = new Pt();
  graphPos: Pt = new Pt();
  graphSize: Pt = new Pt();

  constructor(space: CanvasSpace, margins: Margins) {
    this.viewPos = new Pt(margins.left, margins.top);
    this.viewSize = space.size.$subtract(
      new Pt(margins.left + margins.right, margins.top + margins.bottom)
    );
    this.graphPos = new Pt(0, 0);
    this.graphSize = new Pt(1, 1);
  }

  viewToGraph(pt: Pt): Pt {
    let normalized = pt.$subtract(this.viewPos).$divide(this.viewSize);
    normalized.y = 1 - normalized.y;
    return normalized.$multiply(this.graphSize).$add(this.graphPos);
  }

  viewToGraphX(x: number): number {
    return this.viewToGraph(new Pt(x, 0)).x;
  }

  graphToView(pt: Pt): Pt {
    let normalized = pt.$subtract(this.graphPos).$divide(this.graphSize);
    normalized.y = 1 - normalized.y;
    return normalized.$multiply(this.viewSize).$add(this.viewPos);
  }
}
