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

  shiftReelAssembly() {
    //use array unshift to add a new value to the reelassembely
    for(let x = 0 ; x < this.amountOfReels; x++) {
      if(this.reelAssembly[x][0]) {
        this.reelAssembly[x].pop();
        let randomValue = Math.floor(Math.random() * this.reelTextures.length);
        const symbol = {
          texture: this.reelTextures[randomValue],
          value: randomValue,
        };
        this.reelAssembly[x].unshift(symbol);        
      }
    }
    console.log(this.reelAssembly);
  }

  redrawReels(item, reel, symbol) {
    //almost same as reset, just needs to draw the sprites
    //map the reel assembly to the corresponding item 
    item.texture = this.reelAssembly[reel][symbol].texture;
    
  }

  //WORKS FOR 1 REEL -EXPAND IDEA TO WORK ON ALL REELS!
   animateReelContainer(containerToAnimate, symbolHeight, isLast) {
    const initalPos = containerToAnimate.y;
    let count = 0;
    //console.log("inital pos " + initalPos);
    app.ticker.add(() => {
      containerToAnimate.y += 5;
      if(containerToAnimate.y > initalPos + symbolHeight  ) {
        count++;
        containerToAnimate.y = initalPos;        
        
        for(let y = 0; y < this.symbolsInReel; y++) {          
          this.redrawReels(containerToAnimate.children[y], 0 , y );
          console.log('reached  ' + count );          
        }
        //THIS SHOULD ONLY HAPPEN ONCE AFTER ALL CONTAINERS ARE COMPLETE. 
        //NOT ON EVERY SINGLE COMPLETE CONTAINER...
        //IT DOESNT NEED TO SHIFT THE ENTIRE ASSEMBLY, JUST THE REEL!!!!
        if(isLast) {
          this.shiftReelAssembly();        
        }
      }
    })
  }

  // refactor so this animates 1 reel, or the container for the reel.
  //or make a second function that just does the container
  symbolSpinAnimation(symbol, shouldSpin, reelPos, symbolPos) {
    
    const initialYPos = symbol.y;
    let cycles = 2;
    let allSymbolsMove = 0;
    let totalSymbols = this.symbolsInReel * this.amountOfReels;
    
    app.ticker.add(() => {
      if (shouldSpin) {
        symbol.y += 2.5;
        
        if (symbol.y > initialYPos + symbol.height) {
          allSymbolsMove++;
          symbol.y = initialYPos;
          if(allSymbolsMove === totalSymbols) {
            console.log(allSymbolsMove + " have moved");
          }
         // this.shiftReelAssembly();
          //cycles--;
          
           
    
          

        // this.redrawReels(symbol, reelPos, symbolPos);
          // ONLY FIRST ROW ARE CHANGING??? ALMOST THERE..
          
        }
      }
    });
  }
}
