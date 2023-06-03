/**
 * Creates the visual information for the player UI
 * Needs the gameUIPanel, 
 * bank class
 * game state class
 * Displays the balance, spins left and amount of wins pocketed
 * 
 */
class GameInformation {
  constructor(gameUIPanel, bankClass, gameStateClass) {
    this.gameStateClass = gameStateClass;
    this.gameUIPanel = gameUIPanel;
    this.bankClass = bankClass;
    this.updateGameInfo = this.updateGameInfo;
    this.balanceText = new PIXI.Text(`Balance : ${this.bankClass.balance}`, {
        fontSize: 24,
        fill: 0xffffff,
        fontFamily: "Bitter",
      });
    this.collectedWin = new PIXI.Text(`Collected : ${this.bankClass.collectedWinnings}`, {
        fontSize: 24,
        fill: 0xffffff,
        fontFamily: "Bitter",
      });
      this.spinsLeftText = new PIXI.Text(`Spins Remaining : ${this.gameStateClass.remainingSpins} `, {
        fontSize: 24,
        fill: 0xffffff,
        fontFamily: "Bitter",
      });
  }

  setupGameInfo() {
    const menuButton = new PIXI.Graphics();
    menuButton.beginFill(0x000000, 0.5);
    menuButton.lineStyle(2, 0xffffff, 4);
    menuButton.drawRect(0, 0, footerHeight, footerHeight);
    menuButton.endFill();
    menuButton.interactive = true;
    menuButton.cursor = "pointer";

    menuButton.addListener("pointerdown", () => {
      //open menu modal
      this.toggleModalClass("info-modal", "is-hidden");
    });

    this.gameUIPanel.addChild(menuButton);

    const spinWinBalanceContainer = new PIXI.Container();
    spinWinBalanceContainer.position.set(footerHeight + 10, 10);

    spinWinBalanceContainer.addChild( this.spinsLeftText);
    spinWinBalanceContainer.addChild(this.collectedWin);
    spinWinBalanceContainer.addChild(this.balanceText);
    this.collectedWin.position.set(0,  this.spinsLeftText.height);
    this.balanceText.position.set(0, this.collectedWin.height * 2);
    this.gameUIPanel.addChild(spinWinBalanceContainer);
  }
  updateGameInfo() {
    this.balanceText.text = `Balance : ${this.bankClass.balance}`;
    this.collectedWin.text = `Collected : ${this.bankClass.collectedWinnings}`;
     this.spinsLeftText.text = `Spins Remaining : ${this.gameStateClass.remainingSpins} `;
  }

  toggleModalClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.toggle(className);
    }
  }


  

}
