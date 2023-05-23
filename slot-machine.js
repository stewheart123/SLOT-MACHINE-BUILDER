/**
 * SLOT MACHINE BUILDER
 * created by Stewart Tuckwood *
 * Use this project as a baseplate for other slot-based builds.
 * Use the different branches to establish differing game styles
 */

const utility = new Utilities();
let isSpinning = false;

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);
const loadingContainer = new PIXI.Container();

// load assets - (assetBundles loaded from separate file in index.html <head>)
async function init() {
  const assetManifest = {
    bundles: assetBundles,
  };

  await PIXI.Assets.init({ manifest: assetManifest });
  // bundles can be loaded in the background too!
  //PIXI.Assets.backgroundLoadBundle(['load-screen', 'game-screen']);

  makeLoadScreen();
}

async function makeLoadScreen() {
  // get the assets from the load screen bundle.
  // If the bundle was already downloaded the promise resolves instantly!
  const loadScreenAssets = await PIXI.Assets.loadBundle("load-screen");

  // create a new Sprite from the resolved loaded texture
  const imageWhileYouWait = new PIXI.Sprite(loadScreenAssets.loadingImage);
  imageWhileYouWait.anchor.set(0.5);
  imageWhileYouWait.x = app.screen.width / 2;
  imageWhileYouWait.y = app.screen.height / 2;
  imageWhileYouWait.width = app.screen.width / 1.5;
  imageWhileYouWait.height = utility.autoRatioHeight(
    loadScreenAssets.loadingImage.width,
    loadScreenAssets.loadingImage.height,
    app.screen.width / 1.5
  );
  loadingContainer.addChild(imageWhileYouWait);
  app.stage.addChild(loadingContainer);
}

async function makeGameScreen() {
  //game variables:
  // Wait here until you get the assets
  // If the user spends enough time in the load screen by the time they reach the game screen
  // the assets are completely loaded and the promise resolves instantly!
  const loadScreenAssets = await PIXI.Assets.loadBundle("game-screen");

  const maskBackground = new PIXI.Graphics();
  maskBackground.beginFill(0x000000);
  maskBackground.drawRect(0, 0, app.view.width, app.view.height);
  maskBackground.endFill();
  app.stage.addChild(maskBackground);

  // background
  const backgroundImage = new PIXI.Sprite(loadScreenAssets.backgroundImage);
  backgroundImage.anchor.set(0.5);
  backgroundImage.height = app.view.height;

  let backgroundDynamicWidth = utility.autoRatioWidth(
    loadScreenAssets.backgroundImage.width,
    loadScreenAssets.backgroundImage.height,
    app.view.height
  );
  if (backgroundDynamicWidth < app.view.width) {
    backgroundImage.width = app.view.width;
  } else {
    backgroundImage.width = utility.autoRatioWidth(
      loadScreenAssets.backgroundImage.width,
      loadScreenAssets.backgroundImage.height,
      app.view.height
    );
  }
  backgroundImage.position.set(app.view.width / 2, app.view.height / 2);
  maskBackground.addChild(backgroundImage);
  app.stage.addChild(maskBackground);
  loadingContainer.destroy();

  // game area
  const backgroundPanel = new PIXI.Graphics();
  backgroundPanel.lineStyle(2, 0xffffff, 4);
  backgroundPanel.beginFill(0x000000, 0.5);
  backgroundPanel.drawRect(0, 0, 500, 500);
  backgroundPanel.endFill();

  const gameContainer = new PIXI.Container();
  gameContainer.addChild(backgroundPanel);
  gameContainer.width = gameAreaPanelWidth;
  gameContainer.height = gameAreaPanelHeight;

  //start position
  gameContainer.position.x = app.view.width / 2 - gameContainer.width / 2;
  //gameContainer.position.y = gameContainerYOffset;
  gameContainer.position.y = 0 - gameContainer.height;
  app.stage.addChild(gameContainer);

  //end position
  const gameContainerEndPosition = new PIXI.Point(
    app.view.width / 2 - gameContainer.width / 2,
    gameContainerYOffset
  );
  let gameContainerAnimationComplete = false;
  app.ticker.add(() => {
    if (!gameContainerAnimationComplete) {
      const distance = Math.sqrt(
        Math.pow(gameContainer.position.x - gameContainerEndPosition.x, 2) +
          Math.pow(gameContainer.position.y - gameContainerEndPosition.y, 2)
      );

      const threshold = 1; // Adjust the threshold as needed
      if (distance <= threshold) {
        // Animation complete, do something here
        gameContainerAnimationComplete = true;
        return; // Exit the update loop
      }

      // Move the container towards the target position
      const speed = 0.05; // Adjust the speed of the animation
      gameContainer.position.x +=
        (gameContainerEndPosition.x - gameContainer.position.x) * speed;
      gameContainer.position.y +=
        (gameContainerEndPosition.y - gameContainer.position.y) * speed;
    }
  });

  // GAME UI
  //balance, time, game name, total bet
  //spin button
  /**
   *  game menu button >
   * pay table = how much you get paid!
   * settings = sound / sound FX / left hand mode
   * Questions - defines all terms mentioned in the game, rules etc
   * close modal button
   */

  const gameUIContainer = new PIXI.Container();
  app.stage.addChild(gameUIContainer);
  const gameUIPanel = new PIXI.Graphics();
  //gameUIPanel.pivot.set(0.5);
  gameUIPanel.beginFill(0x000000, 0.5);
  gameUIPanel.lineStyle(2, 0xffffff, 4);
  gameUIPanel.drawRect(0, 0, gameUIPanelWidth, footerHeight);
  gameUIPanel.endFill();
  gameUIContainer.addChild(gameUIPanel);
  app.stage.addChild(gameUIContainer);

  const spinButton = new PIXI.Graphics();
  spinButton.beginFill(0x000000, 0.5);
  spinButton.lineStyle(2, 0xffffff, 4);
  spinButton.drawCircle(gameUIPanel.width - 50, 50, 50);
  spinButton.endFill();
  gameUIPanel.addChild(spinButton);

  spinButton.interactive = true;
  spinButton.cursor = "pointer";

  spinButton.addListener("pointerdown", () => {
    console.log("glick");
    spin();
  });

  function spin() {
    spinButton.interactive = false;
    //  add state - spiining / stopped
    //TODO test to see if final value matches the reelAssembly values..

    //function to check win lines
    //calculate wins based on differning values in win table.
    //re-format architecture so all reel actions live inside the reel class
    reelManager.animateReelContainer(
      gameContainer.children[1],
      gameContainer.width / (reelManager.amountOfReels + 1),
      0,
      spinButton
    );
    reelManager.animateReelContainer(
      gameContainer.children[2],
      gameContainer.width / (reelManager.amountOfReels + 1),
      1,
      spinButton
    );
    reelManager.animateReelContainer(
      gameContainer.children[3],
      gameContainer.width / (reelManager.amountOfReels + 1),
      2,
      spinButton
    );
    reelManager.animateReelContainer(
      gameContainer.children[4],
      gameContainer.width / (reelManager.amountOfReels + 1),
      3,
      spinButton
    );
  }

  const menuButton = new PIXI.Graphics();
  menuButton.beginFill(0x000000, 0.5);
  menuButton.lineStyle(2, 0xffffff, 4);
  menuButton.drawRect(0, 0, footerHeight, footerHeight);
  menuButton.endFill();
  gameUIPanel.addChild(menuButton);
  menuButton.interactive = true;
  menuButton.cursor = "pointer";

  menuButton.addListener("pointerdown", () => {
    //open menu modal
    toggleModalClass("info-modal", "is-hidden");
  });

  const spinWinBalanceContainer = new PIXI.Container();
  spinWinBalanceContainer.position.set(footerHeight + 10, 10);

  const spinsLeftText = new PIXI.Text("Spins :", {
    fontSize: 24,
    fill: 0xffffff,
    fontFamily: "Bitter",
  });

  const winText = new PIXI.Text("Win :", {
    fontSize: 24,
    fill: 0xffffff,
    fontFamily: "Bitter",
  });
  const balanceText = new PIXI.Text("Balance :", {
    fontSize: 24,
    fill: 0xffffff,
    fontFamily: "Bitter",
  });
  spinWinBalanceContainer.addChild(spinsLeftText);
  spinWinBalanceContainer.addChild(winText);
  spinWinBalanceContainer.addChild(balanceText);
  winText.position.set(0, spinsLeftText.height);
  balanceText.position.set(0, winText.height * 2);
  gameUIPanel.addChild(spinWinBalanceContainer);

  // Paytable Button

  //start position
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

  // title
  const headerContainer = new PIXI.Container();
  app.stage.addChild(headerContainer);

  const gameTitle = new PIXI.Text("Slot Machine Builder", {
    fontSize: titleFontSize,
    fill: 0xffffff,
    fontFamily: "Darumadrop One",
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 2,
  });

  gameTitle.anchor.set(0.5);
  headerContainer.position.set(headerContainerWidth, titleYOffset);
  gameTitle.position.set(0, 0);
  headerContainer.addChild(gameTitle);

  //reel assembly - TODO : link up to a containter and instantiate the symbols into game area
  const reelManager = new ReelManager(
    [
      // loadScreenAssets.amber.textureCacheIds[0],
      loadScreenAssets.amber,
      loadScreenAssets.diamond,
      loadScreenAssets.gold,
      loadScreenAssets.opal,
    ],
    5,
    4
  );

  reelManager.resetReels(gameContainer, backgroundPanel);

  // re-draw items on window resize
  window.addEventListener("resize", plotGraphics);

  // commands to re-draw the containers...
  function plotGraphics() {
    if (gameContainerAnimationComplete) {
      app.view.width = window.innerWidth;
      (app.view.height = window.innerHeight),
        (backgroundDynamicWidth = utility.autoRatioWidth(
          loadScreenAssets.backgroundImage.width,
          loadScreenAssets.backgroundImage.height,
          app.view.height
        ));
      if (backgroundDynamicWidth < app.view.width) {
        backgroundImage.width = app.view.width;
      } else {
        backgroundImage.width = utility.autoRatioWidth(
          loadScreenAssets.backgroundImage.width,
          loadScreenAssets.backgroundImage.height,
          app.view.height
        );
      }
      maskBackground.clear();
      maskBackground.beginFill(0x000000);
      maskBackground.drawRect(0, 0, app.view.width, app.view.height);
      maskBackground.endFill();

      backgroundImage.position.set(app.view.width / 2, app.view.height / 2);
      gameContainer.width = gameAreaPanelWidth;
      gameContainer.height = gameAreaPanelHeight;
      gameContainer.position.set(
        app.view.width / 2 - gameContainer.width / 2,
        gameContainerYOffset
      );
      gameUIContainer.width = gameUIPanelWidth;
      gameUIContainer.height = footerHeight;
      gameUIContainer.position.set(
        app.view.width / 2 - gameUIPanelWidth / 2,
        app.view.height - footerHeight
      );
      headerContainer.position.set(headerContainerWidth, titleYOffset);

      spinButton.clear();
      spinButton.beginFill(0x000000, 0.5);
      spinButton.lineStyle(2, 0xffffff, 4);
      spinButton.drawCircle(gameUIPanel.width - 54, 50, 50);
      spinButton.endFill();

      menuButton.clear();
      menuButton.beginFill(0x000000, 0.5);
      menuButton.lineStyle(2, 0xffffff, 4);
      menuButton.drawRect(0, 0, footerHeight, footerHeight);
      menuButton.endFill();
    }
  }
  function toggleModalClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.toggle(className);
    }
  }
}

// game instruction screen
/**
 * - game logo
 * - explain what qualifies as a win
 */

init().then(makeGameScreen);
