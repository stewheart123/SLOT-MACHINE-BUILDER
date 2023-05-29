document.body.appendChild(app.view);
const utility = new Utilities();

//load all assets
//load loading screen
const assetLoader = new AssetLoader();
const sceneLoader = new SceneLoader();
assetLoader.assetsAndLoadingScreen();
//waits on assets to load before running sychronous activity
//load main game
sceneLoader.makeGameScreen().then(() => {
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

  reelManager.resetReels(
    sceneLoader.gameContainer,
    sceneLoader.backgroundPanel
  );

  //add assets to animate for wins
  const animator = new Animator();
  animator.animateGameContainer(sceneLoader.gameUIContainer);
  const bank = new Bank(1000);
  const playControls = new PlayControls(
    sceneLoader.spinButton,
    reelManager,
    sceneLoader.gameContainer
  );
  const gameState = new GameState(50, bank, playControls);
  playControls.gameState = gameState;
  const gameInformation = new GameInformation(
    sceneLoader.gameUIPanel,
    bank,
    gameState);
    gameState.gameInformationClass = gameInformation;
  gameInformation.setupGameInfo();
  gameInformation.updateGameInfo();

  // Game Loop
  gameState.checkCanSpin();
  //if bank state === canPayout

  //if game state !== isSpinning
});

//bank
//add funds
//payout


//handle redraw objects

//add offset to reels, mask overlap

//resizer function