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
}