export interface RenderedElement {
    sprite?: string;
    draw(context: CanvasRenderingContext2D): void;
}
