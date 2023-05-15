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
  gameContainer.position.y = app.view.height / 2 - gameContainer.height / 2;
  app.stage.addChild(gameContainer);

  // game ui

  // title
  const headerContainer = new PIXI.Container();
  headerContainer.width = app.view.width;
  headerContainer.height = headerHeight;
  headerContainer.position.set(0, 0);
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
  gameTitle.position.set(app.view.width / 2, titleYOffset);
  headerContainer.addChild(gameTitle);

  window.addEventListener("resize", plotGraphics);

  //utility functions
  function plotGraphics() {
    gameTitle.position.set(app.view.width / 2, titleYOffset);
  }
}

init().then(makeGameScreen);
