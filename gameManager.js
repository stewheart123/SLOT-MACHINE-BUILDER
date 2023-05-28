document.body.appendChild(app.view);
const utility = new Utilities();

//load all assets
//load loading screen
const assetLoader = new AssetLoader();
//load main game
const sceneLoader = new SceneLoader();
assetLoader.assetsAndLoadingScreen();
console.log("A");
sceneLoader
  .makeGameScreen()
  .then(() => {
    console.log("B");
    const reelManager = new ReelManager(
      [
        sceneLoader.gameScreenAssets.amber,
        sceneLoader.gameScreenAssets.diamond,
        sceneLoader.gameScreenAssets.gold,
        sceneLoader.gameScreenAssets.opal,
      ],
      5,
      4
    );
    console.log(reelManager);
    reelManager.resetReels(
      sceneLoader.gameContainer,
      sceneLoader.backgroundPanel
    );
  })
  .then(() => {
    console.log("C");
    const animator = new Animator();
    animator.animateGameContainer(sceneLoader.gameUIContainer);
  });

//animator
//animate elements into main game

//game state
//spin
//add funds
//payout

//reels
//amount of reels
//amount of symbol on reels
//reel animation behaviour
//win lines - object
//symbol values

//UserInterface
//balance
//spin button
//menu button
//

// const spin = () => {
//     spinButton.interactive = false;

//     //function to check win lines
//     //calculate wins based on differning values in win table.
//     //re-format architecture so all reel actions live inside the reel class
//     reelManager.animateReelContainer(
//       gameContainer.children[1],
//       gameContainer.width / (reelManager.amountOfReels + 1),
//       0,
//        () => {
//         reelManager.checkAllWinLines();
//         spinButton.interactive = true;
//       }
//     );
//     reelManager.animateReelContainer(
//       gameContainer.children[2],
//       gameContainer.width / (reelManager.amountOfReels + 1),
//       1
//     );
//     reelManager.animateReelContainer(
//       gameContainer.children[3],
//       gameContainer.width / (reelManager.amountOfReels + 1),
//       2
//     );
//     reelManager.animateReelContainer(
//       gameContainer.children[4],
//       gameContainer.width / (reelManager.amountOfReels + 1),
//       3
//     );
//   }

//   spinButton.addListener("pointerdown", spin);
//   const menuButton = new PIXI.Graphics();
//   menuButton.beginFill(0x000000, 0.5);
//   menuButton.lineStyle(2, 0xffffff, 4);
//   menuButton.drawRect(0, 0, footerHeight, footerHeight);
//   menuButton.endFill();
//   gameUIPanel.addChild(menuButton);
//   menuButton.interactive = true;
//   menuButton.cursor = "pointer";

//   menuButton.addListener("pointerdown", () => {
//     //open menu modal
//     toggleModalClass("info-modal", "is-hidden");
//   });

//   const spinWinBalanceContainer = new PIXI.Container();
//   spinWinBalanceContainer.position.set(footerHeight + 10, 10);

//   const spinsLeftText = new PIXI.Text("Spins :", {
//     fontSize: 24,
//     fill: 0xffffff,
//     fontFamily: "Bitter",
//   });

//   const winText = new PIXI.Text("Win :", {
//     fontSize: 24,
//     fill: 0xffffff,
//     fontFamily: "Bitter",
//   });
//   const balanceText = new PIXI.Text("Balance :", {
//     fontSize: 24,
//     fill: 0xffffff,
//     fontFamily: "Bitter",
//   });
//   spinWinBalanceContainer.addChild(spinsLeftText);
//   spinWinBalanceContainer.addChild(winText);
//   spinWinBalanceContainer.addChild(balanceText);
//   winText.position.set(0, spinsLeftText.height);
//   balanceText.position.set(0, winText.height * 2);
//   gameUIPanel.addChild(spinWinBalanceContainer);

//   // Paytable Button
