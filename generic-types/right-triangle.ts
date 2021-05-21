export class RightTriangle {
    readonly hypotenuse: number;
    /** The measurement (in degrees) for the angle opposite the height side of the triangle */
    readonly alphaAngle: number;
    /** The measurement (in degrees) for the angle opposite the width side of the triangle */
    readonly betaAngle: number;
    
    constructor(public readonly width: number, public readonly height: number) {
        this.hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.alphaAngle = Math.asin(height / this.hypotenuse) * (180 / Math.PI);
        this.betaAngle = Math.asin(width / this.hypotenuse) * (180 / Math.PI);
    }
}
