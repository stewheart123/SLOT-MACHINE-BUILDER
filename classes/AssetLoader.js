// load assets - (assetBundles loaded from separate file in index.html <head>)
class AssetLoader {}
AssetLoader.prototype.makeLoadScreen = async function makeLoadScreen() {
  const loadingContainer = new PIXI.Container();
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
};

AssetLoader.prototype.assetsAndLoadingScreen =
  async function assetsAndLoadingScreen() {
    const assetManifest = {
      bundles: assetBundles,
    };

    await PIXI.Assets.init({ manifest: assetManifest });
    // bundles can be loaded in the background too!
    //PIXI.Assets.backgroundLoadBundle(['load-screen', 'game-screen']);

    this.makeLoadScreen();
  };
