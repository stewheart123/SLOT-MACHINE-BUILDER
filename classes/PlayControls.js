class PlayControls {
  constructor(spinButton, reelManager, gameContainer) {
    this.spinButton = spinButton;
    this.reelManager = reelManager;
    this.gameContainer = gameContainer;
    this.spinButton.addListener("pointerdown", this.spin.bind(this));
    this.playActive = false;
  }
  setPlayActive() {
    this.playActive = true;
    this.spinButton.interactive = true;
    this.spinButton.cursor = "pointer"; 
  }
  setPlayFalse() {
    this.playActive = false;
    this.spinButton.interactive = false;
  }

  spin() {
    console.log(this.gameContainer);
    if (this.playActive) {
      this.spinButton.interactive = false;
      //function to check win lines
      //calculate wins based on differning values in win table.
      //re-format architecture so all reel actions live inside the reel class
      this.reelManager.animateReelContainer(
        this.gameContainer.children[1],
        this.gameContainer.width / (this.reelManager.amountOfReels + 1),
        0,
        () => {
          this.reelManager.checkAllWinLines();
          this.spinButton.interactive = true;
        }
      );
      this.reelManager.animateReelContainer(
        this.gameContainer.children[2],
        this.gameContainer.width / (this.reelManager.amountOfReels + 1),
        1
      );
      this.reelManager.animateReelContainer(
        this.gameContainer.children[3],
        this.gameContainer.width / (this.reelManager.amountOfReels + 1),
        2
      );
      this.reelManager.animateReelContainer(
        this.gameContainer.children[4],
        this.gameContainer.width / (this.reelManager.amountOfReels + 1),
        3
      );
    }
  }
}
