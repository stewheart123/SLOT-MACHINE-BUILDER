/**
 * Useful tools and methods for calculating dimensions
 *  and placing markers on the screen
 * 
 */
class Utilities {
     autoRatioHeight(originalWidth, originalHeight, targetWidth) {
        let targetHeight = (originalHeight / originalWidth) * targetWidth;
        return(targetHeight);
    }
    //utility functions
     autoRatioWidth(originalWidth, originalHeight, targetHeight) {
        let targetWidth = (originalWidth / originalHeight) * targetHeight;
        return(targetWidth);
    }
    /**
     * Places a marker on the screen 
     * - plug in some responsive variables
     *   and a red dot will appear in the given location
     **/ 

    showPoint(container) {
        const mimicContainer = new PIXI.Container();
        const dot = new PIXI.Graphics();
        dot.beginFill(0xFF0000);
        dot.drawRect(container.x, container.y, 10, 10);
        dot.beginFill();
        mimicContainer.addChild(dot);
        app.stage.addChild(mimicContainer);
    }

    //places red area over the current container dimensions.
    showContainer(container) {
        const mimicContainer = new PIXI.Container();
        const fill = new PIXI.Graphics();
        fill.beginFill(0xFF0000);
        fill.drawRect(0,0, container.width, container.height);
        fill.endFill();    
        app.stage.addChild(mimicContainer);
        mimicContainer.position.set(container.x, container.y);
        mimicContainer.addChild(fill)
    }
}