import {Bounds, IBounds} from "./parseFromIslands.js";
import Trajectory from "./trajectory.js";

/**
 * 
 * @param {Trajectory} trajectory 
 * @param {Array<IBounds>} boundObjects 
 * @returns {Boolean}
 */
export function IsTrajectoryTraversable(trajectory, boundObjects) {
    for (let i = 0; i < trajectory.numSegments; i += 1) {
        const lineSeg = trajectory.getSegment(i);
        const [x1, y1, x2, y2] = [lineSeg[0].x, lineSeg[0].y, lineSeg[1].x, lineSeg[1].y];
        for (const bO of boundObjects) {
            // Test each segment against each bound object
            // Implement specific condition check here
        }
    }

    // Return a boolean value based on specific condition checks
    // This is a placeholder, adjust as per the actual logic
    return true;
}


/**
 * Places bounds at points along the trajectory
 * 
 * @param {Trajectory} trajectory 
 * @param {Array<IBounds>} boundObjects 
 * @param {IBounds} charBounds
 * @returns {Boolean}
 */
export function IsTrajectoryTraversableBox(trajectory, boundObjects, charBounds) {
    const movingBox = new Bounds(
        charBounds.bounds.xMin, charBounds.bounds.xMax, charBounds.yMin, charBounds.yMax);
    const width = movingBox.width;
    for (let i = 0; i < trajectory.points; i += 1) {
        const [x, y] = [trajectory.points[i].x, trajectory.points[i].y];

        movingBox.replace(x-width*.5, y);
        for (const bO of boundObjects) {
            if (!doBoundsIntersect(movingBox, b0.bounds)){
                return false
            }
        }
    }

    return true;
}



/**
 * @param {IBounds} bounds1 - The first bounds object.
 * @param {IBounds} bounds2 - The second bounds object.
 * @returns {boolean} True if the bounds intersect, false otherwise.
 */
function doBoundsIntersect(bounds1, bounds2) {
    if (bounds1.xMax <= bounds2.xMin || bounds2.xMax <= bounds1.xMin) {
        return false;
    }
    if (bounds1.yMax <= bounds2.yMin || bounds2.yMax <= bounds1.yMin) {
        return false;
    }

    // Rectangles intersect
    return true;
}

