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

  resetReels(containerToAppend) {
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

    //replace this with logic for appending sprites
    const idea = new PIXI.Graphics();
    idea.lineStyle(2, 0xffffff, 4);
    idea.beginFill(0x00ff00, 0.5);
    idea.drawRect(0, 0, 500, 500);
    idea.endFill();

    containerToAppend.addChild(idea);

    return this.reelAssembly;
  }
}

/**
 * replaces all boxes with new ones
 */
