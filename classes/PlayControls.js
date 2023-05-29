/**
 * Takes the player buttons and connects them to the reels
 * Needs to know where the reels are appended to in the app
 */
class PlayControls {
  constructor(spinButton, reelManager, gameContainer) {
    this.spinButton = spinButton;
    this.reelManager = reelManager;
    this.gameContainer = gameContainer;
    this.gameState = null;
    this.gameInformationClass = null;

    this.spinButton.addListener("pointerdown", this.spin.bind(this));
    this.playActive = false;
  }
  setPlayReady() {
    this.playActive = true;
    this.spinButton.interactive = true;
    this.spinButton.cursor = "pointer"; 
  }
  blockPlay() {
    this.playActive = false;
    this.spinButton.interactive = false;
  }
  test(){
    console.log("TEST CALLBACK");
  }

  spin() {
    if (this.playActive) {
      this.gameState.deductNextSpin();
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
          this.gameState.checkCanSpin();
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
