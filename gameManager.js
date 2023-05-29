document.body.appendChild(app.view);
const utility = new Utilities();

//load all assets
//load loading screen
const assetLoader = new AssetLoader();
const sceneLoader = new SceneLoader();
assetLoader.assetsAndLoadingScreen();
//waits on assets to load before running sychronous activity
//load main game
sceneLoader
  .makeGameScreen()
  .then(() => {
   
    // to abstract this further, sceneLoader can return an array of items
    //called reel symbols...
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

    const animator = new Animator();
    animator.animateGameContainer(sceneLoader.gameUIContainer);
   //console.log(sceneLoader.gameContainer);

    const playControls = new PlayControls(sceneLoader.spinButton,reelManager, sceneLoader.gameContainer);
  
    playControls.setPlayActive();

    //logic - set game state, 
    // if check gameState === ready

    //if game state equals === no funds


    //if game state === canPayout


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
