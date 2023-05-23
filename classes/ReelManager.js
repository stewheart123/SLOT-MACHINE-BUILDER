class ReelManager {
  constructor(reelTextures, symbolsInReel, amountOfReels) {
    this.reelAssembly = [];
    this.reelTextures = reelTextures;
    this.reel = [];
    this.amountOfReels = amountOfReels;
    this.symbolsInReel = symbolsInReel;
    //sets random numer in each reel
    for (let y = 0; y < amountOfReels; y++) {
      const tempReel = [];
      for (let x = 0; x < symbolsInReel; x++) {
        const randomValue = Math.floor(
          Math.random() * this.reelTextures.length
        );
        const symbol = {
          texture: reelTextures[randomValue],
          value: randomValue,
        };
        tempReel.push(symbol);
      }
      this.reelAssembly.push(tempReel);
    }
  }

  resetReels(containerToAppend, panelToRebuild) {
    //not sure why both the panel and container need emptying
    containerToAppend.removeChildren();
    panelToRebuild.removeChildren();
    containerToAppend.addChild(panelToRebuild);
    this.reelAssembly.length = 0;

    for (let y = 0; y < this.amountOfReels; y++) {
      const tempReel = [];
      for (let x = 0; x < this.symbolsInReel; x++) {
        let randomValue = Math.floor(Math.random() * this.reelTextures.length);
        const symbol = {
          texture: this.reelTextures[randomValue],
          value: randomValue,
        };
        tempReel.push(symbol);
      }
      this.reelAssembly.push(tempReel);
    }

    // for loop that loops over contents in multidimensional array
    //creates the sprites and assigns a position
    for (let i = 0; i < this.amountOfReels; i++) {
      const reelContainer = new PIXI.Container();
      for (let y = 0; y < this.symbolsInReel; y++) {
        let reelSymbol = new PIXI.Sprite();
        reelSymbol.texture = this.reelAssembly[i][y].texture;
        reelSymbol.width = containerToAppend.width / (this.amountOfReels + 1);
        reelSymbol.height = containerToAppend.width / (this.amountOfReels + 1);
        reelContainer.addChild(reelSymbol);
        reelSymbol.position.set(reelSymbol.width * i, reelSymbol.height * y);
      }
      containerToAppend.addChild(reelContainer);
    }
  }
  //works on one reel only
  shiftReelValues(reelToShift) {
    this.reelAssembly[reelToShift].pop();
    let randomValue = Math.floor(Math.random() * this.reelTextures.length);
    const symbol = {
      texture: this.reelTextures[randomValue],
      value: randomValue,
    };
    this.reelAssembly[reelToShift].unshift(symbol);
  }

  redrawReel(item, reel, symbol) {
    //almost same as reset, just needs to draw the sprites
    //map the reel assembly to the corresponding item
    item.texture = this.reelAssembly[reel][symbol].texture;
  }

  // animates only 1 reel
  //add function that check all reels are either started or stopped..
  animateReelContainer(
    containerToAnimate,
    symbolHeight,
    reelToShift,
    buttonState
  ) {
    const reelTicker = new PIXI.Ticker();
    const initalPos = containerToAnimate.y;
    let count = 0;
    reelTicker.start();
    reelTicker.add(() => {
      containerToAnimate.y += 1 * (reelToShift * 2) + 10; // distance to move
      if (containerToAnimate.y > initalPos + symbolHeight) {
        count++;
        containerToAnimate.y = initalPos;
        this.shiftReelValues(reelToShift);
        for (let y = 0; y < this.symbolsInReel; y++) {
          this.redrawReel(containerToAnimate.children[y], reelToShift, y);
        }
      }
      if (count === 10) {
        reelTicker.stop();
        count = 0;
        if (reelToShift == 0) {
          buttonState.interactive = true;
        }
        return true;
      }
    }, 60);
  }
}
