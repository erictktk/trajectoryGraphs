/** 
 * Empty class
 * Represents a point in 2D space.
 * @typedef {Object} Point
 * @property {number} x - The x-coordinate of the point.
 * @property {number} y - The y-coordinate of the point.
 */



/**
 * Class representing a trajectory composed of piecewise linear paths defined by an array of points.
 */
export default class Trajectory {
    /**
     * Creates a trajectory instance.
     */
    constructor(points=[]) {
        /** @type {Point[]} */
        this.points = points;
    }

    /**
     * Adds a new point to the trajectory.
     * @param {Point} point - The point to be added to the trajectory.
     */
    addPoint(point) {
        this.points.push(point);
    }

    get numSegments(){
        return this.points.length-1;
    }

    /**
     * Gets the line segment between two consecutive points.
     * @param {number} index - The index of the starting point of the segment.
     * @returns {Point[]} The line segment as an array of two points, or throws an error if the index is out of range.
     * @throws {Error} If the index is out of range.
     */
    getSegment(index) {
        if (index < 0 || index >= this.points.length - 1) {
            throw new Error("line segment is out of range!");
        }
        return [this.points[index], this.points[index + 1]];
    }

    /**
     * Gets the position at a specific point along the trajectory.
     * @param {number} u - A value between 0 and 1 indicating the position along the trajectory.
     * @returns {Point | null} The point at the specified position or null if the trajectory is empty.
     */
    getPositionAt(u) {
        if (this.points.length === 0) {
            return null;
        }

        if (u <= 0) {
            return this.points[0];
        }

        if (u >= 1) {
            return this.points[this.points.length - 1];
        }

        // Calculate the total length of the trajectory
        let totalLength = 0;
        for (let i = 0; i < this.points.length - 1; i++) {
            totalLength += this.distanceBetweenPoints(this.points[i], this.points[i + 1]);
        }

        // Find the target length along the trajectory
        let targetLength = totalLength * u;
        let accumulatedLength = 0;

        for (let i = 0; i < this.points.length - 1; i++) {
            let segmentLength = this.distanceBetweenPoints(this.points[i], this.points[i + 1]);
            if (accumulatedLength + segmentLength >= targetLength) {
                // Interpolate within this segment
                let segmentU = (targetLength - accumulatedLength) / segmentLength;
                return this.interpolate(this.points[i], this.points[i + 1], segmentU);
            }
            accumulatedLength += segmentLength;
        }

        // Fallback, should not be reached
        return this.points[this.points.length - 1];
    }

    /**
     * Calculates the distance between two points.
     * @param {Point} point1 - The first point.
     * @param {Point} point2 - The second point.
     * @returns {number} The distance between the two points.
     */
    distanceBetweenPoints(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Linearly interpolates between two points.
     * @param {Point} point1 - The start point.
     * @param {Point} point2 - The end point.
     * @param {number} u - The interpolation parameter, ranging from 0 to 1.
     * @returns {Point} The interpolated point.
     */
    interpolate(point1, point2, u) {
        return {
            x: point1.x + (point2.x - point1.x) * u,
            y: point1.y + (point2.y - point1.y) * u
        };
    }

}