import AttribIsland from "../AttribPainterStuff/attribPainterIsland.js";
import * as RowUtils from "../PixelArtUtils/RowUtils.js";

//export function 

/**
 * Represents the bounds of a rectangular area.
 */
export class Bounds {
    /**
     * Creates an instance of Bounds.
     * @param {number} xMin - The minimum x-coordinate.
     * @param {number} xMax - The maximum x-coordinate (exclusive).
     * @param {number} yMin - The minimum y-coordinate.
     * @param {number} yMax - The maximum y-coordinate.
     */
    constructor(xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax; // Exclusive
        this.yMin = yMin;
        this.yMax = yMax;

        this.width = this.xMax - this.xMin;
        this.height = this.yMax - this.yMin;
    }

    replace(xMinNew=null, yMinNew=null){
        if(xMinNew){
            this.xMin = xMinNew;
            this.xMax = xMinNew + this.width;
        }
        if (yMinNew){
            this.yMin = yMinNew;
            this.yMax = yMinNew + this.height;
        }
    }

    rePlaceX(xMinNew){
        this.xMin = xMinNew;
        this.xMax = xMinNew + this.width;
    }

    rePlaceY(yMinNew){
        this.yMin = yMinNew;
        this.yMax = yMinNew + this.height;
    }
}

/**
 * Interface for a class that includes a Bounds object.
 * @interface IBounds
 */
export class IBounds {
    constructor() {
        /**
         * The Bounds object associated with this class.
         * @type {Bounds}
         */
        this.bounds = null;
    }

    /**
     * An example method that should be implemented.
     */
    someMethod() {
        // Method implementation
    }
}



export function ParseIslandVertically(attribIsland){
    const pixelArray = attribIsland.pixelArray;

    let storedValue = RowUtils.HighestAtColAdjust(0);
    let curXMin = 0;
    let curValue = -1;

    const boundsList = [];

    for(let i = 1; i < pixelArray.width; i += 1){
        curValue = RowUtils.HighestAtColAdjust(i);

        if (curValue !== storedValue){
            boundsList.push(new Bounds(curXMin, i, storedValue, storedValue));

            storedValue = curValue;
            curXMin = i;
        }
        if (i === pixelArray.width-1){
            boundsList.push( new Bounds(curXMin, i+1, storedValue, storedValue));
        }
    }

    return boundsList;
}