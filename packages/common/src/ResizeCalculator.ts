export type Size = { width: number; height: number };

export type ResizeCallback = (size: Size) => any;

export type Pos = { x: number; y: number };

export class ResizeCalculator {
  private initPos: Pos = { x: 0, y: 0 };
  private initSize: Size = { width: 0, height: 0 };
  private currentSize: Size = { width: 0, height: 0 };
  private onResizeCallback: ResizeCallback | null = null;
  private onStopCallback: ResizeCallback | null = null;

  constructor(private readonly element: HTMLElement, 
    private readonly maxWidth: number = Number.MAX_VALUE, 
    private readonly maxHeight: number = Number.MAX_VALUE) {
  }

  initResize(e: React.MouseEvent) {
    this.initPos = { x: e.clientX, y: e.clientY };
    this.initSize = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
    this.currentSize = { ...this.initSize };
    const resizeHandler = (e: MouseEvent) => this.handleResize(e)
    const stopResizeHandler = () => {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", stopResizeHandler);
      this.onStopCallback?.({ ...this.currentSize });
    }
    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", stopResizeHandler);
  }

  private handleResize(event: MouseEvent) {
    const { width, height } = this.initSize;
    const { x, y } = this.initPos;
    this.currentSize = {
      width: Math.min(width + (event.clientX - x), this.maxWidth),
      height: Math.min(height + (event.clientY - y), this.maxHeight),
    };
    this.onResizeCallback?.({ ...this.currentSize });
  }

  onResize(callback: ResizeCallback): ResizeCalculator {
    this.onResizeCallback = callback;
    return this;
  }

  onStop(callback: ResizeCallback): ResizeCalculator {
    this.onStopCallback = callback;
    return this;
  }

  public static getWidthAsPercentage(width: number, parentElement?: HTMLElement): number {
    parentElement = parentElement || document.body
    return (width / parentElement.clientWidth) * 100
  }

  public static getHeightAsPercentage(height: number, parentElement?: HTMLElement): number {
    parentElement = parentElement || document.body
    return (height / parentElement.clientHeight) * 100
  }

}
