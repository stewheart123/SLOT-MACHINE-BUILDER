class ReelManager {
  constructor(reelTextures, symbolsInReel, amountOfReels) {
    this.reelAssembly = [];
    this.reelTextures = reelTextures;
    this.reel = [];
    this.amountOfReels = amountOfReels;
    this.symbolsInReel = symbolsInReel;
    //sets random numer in each reel
    for (let i = 0; i < amountOfReels; i++) {
      const tempReel = [];
      for (let x = 0; x < symbolsInReel; x++) {
        const randomValue = Math.floor(Math.random() * symbolsInReel);
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

    for (let i = 0; i < this.amountOfReels; i++) {
      const tempReel = [];
      for (let x = 0; x < this.symbolsInReel; x++) {
        let randomValue = Math.floor(Math.random() * this.symbolsInReel);
        const symbol = {
          texture: this.reelTextures[randomValue],
          value: randomValue,
        };

        tempReel.push(symbol);
      }
      this.reelAssembly.push(tempReel);
    }

    // for loop that loops over contents in multidimensional array
    for (let x = 0; x < this.amountOfReels; x++) {
      const reelContainer = new PIXI.Container();
      for (let y = 0; y < this.symbolsInReel; y++) {
        let reelSymbol = new PIXI.Sprite();
        reelSymbol.texture = this.reelAssembly[x][y].texture;
        reelSymbol.width = containerToAppend.width / this.amountOfReels;
        reelSymbol.height = containerToAppend.width / this.amountOfReels;
        reelContainer.addChild(reelSymbol);
        reelSymbol.position.set(
          (y * containerToAppend.width) / this.amountOfReels,
          (containerToAppend.width / this.amountOfReels) * x -
            containerToAppend.width / this.amountOfReels
        );
      }
      containerToAppend.addChild(reelContainer);
    }

    // TODO
    /**
     * SHIFT ARRAY BY 1, CREATE NEW ONE AT AS THE STARTING SYMBOL
     * REDRAW THE SYMBOLS?
     */
  }

  symbolSpinAnimation(symbol, shouldSpin) {
    const initialYPos = symbol.y;
    app.ticker.add(() => {
      if (shouldSpin) {
        symbol.y += 2.5;

        if (symbol.y > initialYPos + symbol.height) {
          symbol.y = initialYPos;
        }
      }
    });
  }
}
