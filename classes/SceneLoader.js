

class SceneLoader {
  constructor() {
    this.gameUIContainer = new PIXI.Container();
    this.gameContainer = new PIXI.Container();
    this.backgroundPanel = new PIXI.Graphics();
    this.gameScreenAssets = null;
    this.spinButton = new PIXI.Graphics();
  }

async makeGameScreen() {
    const loadingContainer = new PIXI.Container();
    //game variables:
    // Wait here until you get the assets
    // If the user spends enough time in the load screen by the time they reach the game screen
    // the assets are completely loaded and the promise resolves instantly!
    this.gameScreenAssets = await PIXI.Assets.loadBundle("game-screen");
    const maskBackground = new PIXI.Graphics();
    maskBackground.beginFill(0x000000);
    maskBackground.drawRect(0, 0, app.view.width, app.view.height);
    maskBackground.endFill();
    app.stage.addChild(maskBackground);
  
    // background
    const backgroundImage = new PIXI.Sprite( this.gameScreenAssets.backgroundImage);
    backgroundImage.anchor.set(0.5);
    backgroundImage.height = app.view.height;
  
    let backgroundDynamicWidth = utility.autoRatioWidth(
       this.gameScreenAssets.backgroundImage.width,
       this.gameScreenAssets.backgroundImage.height,
      app.view.height
    );
    if (backgroundDynamicWidth < app.view.width) {
      backgroundImage.width = app.view.width;
    } else {
      backgroundImage.width = utility.autoRatioWidth(
         this.gameScreenAssets.backgroundImage.width,
         this.gameScreenAssets.backgroundImage.height,
        app.view.height
      );
    }
    backgroundImage.position.set(app.view.width / 2, app.view.height / 2);
    maskBackground.addChild(backgroundImage);
    app.stage.addChild(maskBackground);
    loadingContainer.destroy();
  
    // game area
    this.backgroundPanel.lineStyle(2, 0xffffff, 4);
    this.backgroundPanel.beginFill(0x000000, 0.5);
    this.backgroundPanel.drawRect(0, 0, 500, 500);
    this.backgroundPanel.endFill();
  
    this.gameContainer.addChild(this.backgroundPanel);
    this.gameContainer.width = gameAreaPanelWidth;
    this.gameContainer.height = gameAreaPanelHeight;
  
    //start position
    this.gameContainer.position.x = app.view.width / 2 - this.gameContainer.width / 2;
    //gameContainer.position.y = gameContainerYOffset;
    this.gameContainer.position.y = 0 - this.gameContainer.height;
    app.stage.addChild(this.gameContainer);
  
    //end position
    const gameContainerEndPosition = new PIXI.Point(
      app.view.width / 2 - this.gameContainer.width / 2,
      gameContainerYOffset
    );
    let gameContainerAnimationComplete = false;
    app.ticker.add(() => {
      if (!gameContainerAnimationComplete) {
        const distance = Math.sqrt(
          Math.pow( this.gameContainer.position.x - gameContainerEndPosition.x, 2) +
            Math.pow( this.gameContainer.position.y - gameContainerEndPosition.y, 2)
        );
  
        const threshold = 1; // Adjust the threshold as needed
        if (distance <= threshold) {
          // Animation complete, do something here
          gameContainerAnimationComplete = true;
          return; // Exit the update loop
        }
  
        // Move the container towards the target position
        const speed = 0.05; // Adjust the speed of the animation
         this.gameContainer.position.x +=
          (gameContainerEndPosition.x -  this.gameContainer.position.x) * speed;
         this.gameContainer.position.y +=
          (gameContainerEndPosition.y -  this.gameContainer.position.y) * speed;
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
  
    // const gameUIContainer = new PIXI.Container();
    app.stage.addChild(this.gameUIContainer);
    const gameUIPanel = new PIXI.Graphics();
    //gameUIPanel.pivot.set(0.5);
    gameUIPanel.beginFill(0x000000, 0.5);
    gameUIPanel.lineStyle(2, 0xffffff, 4);
    gameUIPanel.drawRect(0, 0, gameUIPanelWidth, footerHeight);
    gameUIPanel.endFill();
     this.gameUIContainer.addChild(gameUIPanel);
    app.stage.addChild(this.gameUIContainer);
  
    
    this.spinButton.beginFill(0x000000, 0.5);
    this.spinButton.lineStyle(2, 0xffffff, 4);
    this.spinButton.drawCircle(gameUIPanel.width - 50, 50, 50);
    this.spinButton.endFill();
    gameUIPanel.addChild(this.spinButton);
  

  
    // title
    const headerContainer = new PIXI.Container();
    app.stage.addChild(headerContainer);
  
    const gameTitle = new PIXI.Text("v2", {
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
    
    // re-draw items on window resize
    window.addEventListener("resize", plotGraphics);
  
    // commands to re-draw the containers...
    function plotGraphics() {
      if (gameContainerAnimationComplete) {
        app.view.width = window.innerWidth;
        (app.view.height = window.innerHeight),
          (backgroundDynamicWidth = utility.autoRatioWidth(
             this.gameScreenAssets.backgroundImage.width,
             this.gameScreenAssets.backgroundImage.height,
            app.view.height
          ));
        if (backgroundDynamicWidth < app.view.width) {
          backgroundImage.width = app.view.width;
        } else {
          backgroundImage.width = utility.autoRatioWidth(
             this.gameScreenAssets.backgroundImage.width,
             this.gameScreenAssets.backgroundImage.height,
            app.view.height
          );
        }
        maskBackground.clear();
        maskBackground.beginFill(0x000000);
        maskBackground.drawRect(0, 0, app.view.width, app.view.height);
        maskBackground.endFill();
  
        backgroundImage.position.set(app.view.width / 2, app.view.height / 2);
         this.gameContainer.width = gameAreaPanelWidth;
         this.gameContainer.height = gameAreaPanelHeight;
         this.gameContainer.position.set(
          app.view.width / 2 -  this.gameContainer.width / 2,
          gameContainerYOffset
        );
         this.gameUIContainer.width = gameUIPanelWidth;
         this.gameUIContainer.height = footerHeight;
         this.gameUIContainer.position.set(
          app.view.width / 2 - gameUIPanelWidth / 2,
          app.view.height - footerHeight
        );
        headerContainer.position.set(headerContainerWidth, titleYOffset);
  
        this.spinButton.clear();
        this.spinButton.beginFill(0x000000, 0.5);
        this.spinButton.lineStyle(2, 0xffffff, 4);
        this.spinButton.drawCircle(gameUIPanel.width - 54, 50, 50);
        this.spinButton.endFill();
  
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
//  return(this.gameScreenAssets);
};
}