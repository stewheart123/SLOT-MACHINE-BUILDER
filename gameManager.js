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
  const reelMechanism = new ReelMechanism(
    [
      sceneLoader.gameScreenAssets.amber,
      sceneLoader.gameScreenAssets.diamond,
      sceneLoader.gameScreenAssets.gold,
      sceneLoader.gameScreenAssets.opal,
    ],
    5,
    4,
    sceneLoader.gameContainer
  );

  reelMechanism.resetReels(
    sceneLoader.gameContainer,
    sceneLoader.backgroundPanel
  );
  console.log("----------------");
  console.log(reelMechanism.symbolContainer);
  //add assets to animate for wins
  const animator = new Animator();
  reelMechanism.animatorClass = animator;
  animator.animateGameContainer(sceneLoader.gameUIContainer);
  const bank = new Bank(1000);
  reelMechanism.bankClass = bank;
  const playControls = new PlayControls(
    sceneLoader.spinButton,
    reelMechanism,
    sceneLoader.gameContainer
  );
  const gameState = new GameState(50, bank, playControls);
  playControls.gameState = gameState;
  const gameInformation = new GameInformation(
    sceneLoader.gameUIPanel,
    bank,
    gameState
  );
  gameState.gameInformationClass = gameInformation;
  reelMechanism.scoreText = gameInformation.balanceText;

  gameInformation.setupGameInfo();
  gameInformation.updateGameInfo();
  gameState.checkCanSpin();

  // dynamically adds click listeners to html document
  var fundingButton = document.getElementById("add-funds");
  fundingButton.addEventListener("click", function () {
    bank.addFunds(1000);
    gameState.displaySpins();
  });
  var collectWinningsButton = document.getElementById("collect-winnings");
  collectWinningsButton.addEventListener("click", function () {
    bank.payout(bank.balance);
    gameState.displaySpins();
  });
});

//resizer function
