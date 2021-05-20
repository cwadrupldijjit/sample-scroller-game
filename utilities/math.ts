import { Coordinate } from '../generic-types/coordinate.js';
import { RightTriangle } from '../generic-types/right-triangle.js';

export function calculateTrianglePath(startCoordinate: Coordinate, endCoordinate: Coordinate) {
    const width = startCoordinate.x - endCoordinate.x;
    const height = startCoordinate.y - endCoordinate.y;
    
    return new RightTriangle(width, height);
}

export function calculateDiagonalMovement(triangle: RightTriangle, distance: number): Coordinate {
    const distancePercentageDownHypotenuse = distance / triangle.hypotenuse;
    
    return {
        x: triangle.width * distancePercentageDownHypotenuse,
        y: triangle.height * distancePercentageDownHypotenuse,
    };
}

export function randomInt(minimum: number, maximum: number) {
    const max = Math.max(minimum, maximum);
    const min = Math.min(minimum, maximum);
    return min + Math.round((max - min) * Math.random());
}
