// load assets - (assetBundles loaded from separate file in index.html <head>)
class AssetLoader {
  
  constructor() {
    this.loadedScreenAssets = null;
  }

  async makeLoadScreen() {
    const loadingContainer = new PIXI.Container();
    // get the assets from the load screen bundle.
    // If the bundle was already downloaded the promise resolves instantly!
    this.loadedScreenAssets = await PIXI.Assets.loadBundle("load-screen");
  
    // create a new Sprite from the resolved loaded texture
    const imageWhileYouWait = new PIXI.Sprite(this.loadedScreenAssets.loadingImage);
    imageWhileYouWait.anchor.set(0.5);
    imageWhileYouWait.x = app.screen.width / 2;
    imageWhileYouWait.y = app.screen.height / 2;
    imageWhileYouWait.width = app.screen.width / 1.5;
    imageWhileYouWait.height = utility.autoRatioHeight(
      this.loadedScreenAssets.loadingImage.width,
      this.loadedScreenAssets.loadingImage.height,
      app.screen.width / 1.5
    );
    loadingContainer.addChild(imageWhileYouWait);
    app.stage.addChild(loadingContainer);
  }
  
  async assetsAndLoadingScreen() {
    const assetManifest = {
      bundles: assetBundles, // this is object from AssetManifest.js
    };

    await PIXI.Assets.init({ manifest: assetManifest });
    // bundles can be loaded in the background too!
    //PIXI.Assets.backgroundLoadBundle(['load-screen', 'game-screen']);

    this.makeLoadScreen();
  }
}
