/**
 * SLOT MACHINE BUILDER
 * created by Stewart Tuckwood *
 * Use this project as a baseplate for other slot-based builds.
 * Use the different branches to establish differing game styles
 */

const utility = new Utilities();

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
  // Wait here until you get the assets
  // If the user spends enough time in the load screen by the time they reach the game screen
  // the assets are completely loaded and the promise resolves instantly!
  const loadScreenAssets = await PIXI.Assets.loadBundle("game-screen");
  const maskBackground = new PIXI.Graphics();
  maskBackground.beginFill(0xff0000);
  maskBackground.drawRect(0, 0, app.screen.width, app.screen.height);
  maskBackground.endFill();
  app.stage.addChild(maskBackground);

  // background
  const backgroundImage = new PIXI.Sprite(loadScreenAssets.backgroundImage);
  backgroundImage.anchor.set(0.5);
  backgroundImage.height = app.screen.height;
  let backgroundDynamicWidth = utility.autoRatioWidth(
    loadScreenAssets.backgroundImage.width,
    loadScreenAssets.backgroundImage.height,
    app.screen.height
  );
  if (backgroundDynamicWidth < app.screen.width) {
    backgroundImage.width = app.screen.width;
  } else {
    backgroundImage.width = utility.autoRatioWidth(
      loadScreenAssets.backgroundImage.width,
      loadScreenAssets.backgroundImage.height,
      app.screen.height
    );
  }
  backgroundImage.position.set(app.screen.width / 2, app.screen.height / 2);
  maskBackground.addChild(backgroundImage);
  app.stage.addChild(maskBackground);
  loadingContainer.destroy();

  // game area
  const backgroundPanel = new PIXI.Graphics();
  backgroundPanel.lineStyle(2, 0xffffff, 4);
  backgroundPanel.drawRect(0, 0, 500, 500);

  const gameContainer = new PIXI.Container();
  gameContainer.addChild(backgroundPanel);
  gameContainer.width = gameAreaPanelWidth;
  gameContainer.height = gameAreaPanelHeight;
  gameContainer.position.x = app.view.width / 2 - gameContainer.width / 2;
  gameContainer.position.y = gameContainerYOffset;
  app.stage.addChild(gameContainer);

  // GAME UI
  //balance, time, game name, total bet

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
  gameUIPanel.drawRect(0,0, gameUIPanelWidth, footerHeight);
  gameUIPanel.endFill();
  gameUIContainer.addChild(gameUIPanel);
  app.stage.addChild(gameUIContainer);
  gameUIContainer.position.set((app.view.width / 2) - (gameUIPanelWidth / 2) , app.view.height - footerHeight);

  //spin button

  // title
  const headerContainer = new PIXI.Container();
  // headerContainer.width = app.view.width;
  // headerContainer.height = headerHeight;
  //headerContainer.position.set(0, 0);
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
  gameTitle.position.set(0,0);
  headerContainer.addChild(gameTitle);
  
  // re-draw items on window resize
  window.addEventListener("resize", plotGraphics);

  
  function plotGraphics() {
    // commands to re-draw the containers...
  }
}

// game instruction screen 
/**
 * - game logo
 * - explain what qualifies as a win
 */

init().then(makeGameScreen);
