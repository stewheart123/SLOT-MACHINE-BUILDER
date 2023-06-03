/**
 * An intro animation that moves the game assets into the main scene
 */
class Animator {
  //start position

  animateGameContainer(gameUIContainer) {
    gameUIContainer.position.set(
      app.view.width / 2 - gameUIPanelWidth / 2,
      app.view.height
    );
    let gameUIContainerAnimationComplete = false;
    //end position
    const targetPosition = new PIXI.Point(
      app.view.width / 2 - gameUIPanelWidth / 2,
      app.view.height - footerHeight
    );
    //animation
    app.ticker.add(() => {
      if (!gameUIContainerAnimationComplete) {
        // Calculate the distance between the current position and the target position
        const distance = Math.sqrt(
          Math.pow(gameUIContainer.position.x - targetPosition.x, 2) +
            Math.pow(gameUIContainer.position.y - targetPosition.y, 2)
        );

        // Check if the container has reached the target position using a threshold
        const threshold = 1; // Adjust the threshold as needed
        if (distance <= threshold) {
          // Animation complete, do something here
          gameUIContainerAnimationComplete = true;
          gameUIContainer.interactive = true;
          return; // Exit the update loop
        }

        // Move the container towards the target position
        const speed = 0.05; // Adjust the speed of the animation
        gameUIContainer.position.x +=
          (targetPosition.x - gameUIContainer.position.x) * speed;
        gameUIContainer.position.y +=
          (targetPosition.y - gameUIContainer.position.y) * speed;
      }
    });
  }

  /**
   * takes in the objects that have won as an array
   * loops through each one, making it grow in scale
   * connects to reelMechanism.checkAllWinLines
   *
   */

  winAnimator(symbolArray) {
    return new Promise((resolve) => {
      const targetScale = 0.25;
      const animationDuration = 80;
  
      symbolArray[0].forEach((element) => {
        const scaleInitial = element.scale.x; // Assuming scale.x is the initial scale value
        const scaleDelta = targetScale - scaleInitial;
        let elapsedTime = 0;
  
        const ticker = new PIXI.Ticker();
        ticker.start();
  
        ticker.add((delta) => {
          elapsedTime += delta;
  
          if (elapsedTime <= animationDuration) {
            const progress = elapsedTime / animationDuration;
            const scale = scaleInitial + scaleDelta * progress;
            element.scale.set(scale);
          } else {
            ticker.stop();
            element.scale.set(scaleInitial);
            resolve();
          }
        });
        element.scale.set(scaleInitial);
      });

    });
  }


}
