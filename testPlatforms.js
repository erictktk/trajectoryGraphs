import {Bounds, IBounds} from "./parseFromIslands.js";

export class TempPlatform{
    constructor(bounds, passableUnderneath=false, ){
        this.bounds = bounds;
        this.passableUnderneath = passableUnderneath;
    }
}

export function TestPlatformsOverlap(bounds1, bounds2){
    //
}

export function TestPlatformsWithinRange(bounds1, bounds2){
    //test left to right


    //                ########### bounds 2
    //
    //            ###### bounds1
    const lrDif =  Math.max(0, bounds2.xMin-bounds1.xMax);
    //                ########### bounds1  xMin - xMax
    //
    //            ###### bounds2

    //    ########### bounds2  => bounds1.xMin-bounds2.xMax
    //
    //            ###### bounds1

    //    ########### bounds1  => bounds2.xMax-bounds1.xMin
    //
    //            ###### bounds2

    //const rlDif = Math.max(0, bounds2.xMax-bounds1.xMin);

}

export function TestPlatformsWithinRangeTopBottom(bottomBounds, topBounds){
    const lrDif = Math.max(0, topBounds.xMin-bottomBounds.xMax);
    const rlDif = Math.max(0, bottomBounds.xMin-topBounds.xMax);

    return [lrDif, rlDif];
}

export function TestIfTopPlatformContains(bottomBounds, topBounds){
    if (bottomBounds.xMin >= topBounds.xMin && bottomBounds.xMax <= topBounds.xMax){
        return true;
    }
    return false;
}


/**
 * Tests whether it's possible to jump between two platforms.
 * @param {IBounds} tempPlatform1 - The first platform object, with bounds property.
 * @param {IBounds} tempPlatform2 - The second platform object, with bounds property.
 * @param {number} maxJumpHeight - The maximum height that can be jumped.
 * @param {number} maxJumpWidth - The maximum width that can be jumped.
 * @returns {boolean} True if the jump between platforms is possible, false otherwise.
 */
export function TestPlatformsJumpable(tempPlatform1, tempPlatform2, maxJumpHeight, maxJumpWidth){
    //
    let top = null;
    let bottom = null;

    const bounds1 = tempPlatform1.bounds;
    const bounds2 = tempPlatform2.bounds;

    if (bounds1.yMax >= bounds2.yMax){
        top = bounds1;
        bottom = bounds2;
    }
    else{
        top = bounds2;
        bottom = bounds1;
    }

    //needs to test if top is passableUnderneath
    console.log('implement testing to see if top contains and is passble from undeneath')

    const [lrDif, rlDif] = TestPlatformsWithinRangeTopBottom(bottom, top);

    if (lrDif <= maxJumpWidth || rlDif <= maxJumpWidth){
        return false;
    }       

    const heightDif = top.yMin-bottom.yMax;

    if (heightDif > maxJumpHeight){
        return false;
    }

    return true;
    
}


export function TestTraversable(trajectory){

}

export function 

export function TestPlatformsFallableSimple(){

}