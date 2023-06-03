/**
 * sets up the symbol types, amount of reels and amount of symbols on a reel
 * animates the reel
 * defines the win lines
 *
 */
class ReelMechanism {
  constructor(reelTextures, symbolsInReel, amountOfReels, symbolContainer) {
    this.reelAssembly = [];
    this.reelTextures = reelTextures;
    this.reel = [];
    this.amountOfReels = amountOfReels;
    this.symbolsInReel = symbolsInReel;
    this.animatorClass = null;
    this.symbolContainer = symbolContainer;
    this.bankClass = null;

    //ADAPT WIN LINES TO ALSO HAVE ANOTHER PROP CONTAINING ARRAY OF SYMBOLS FROM GAME CONTAINER
    this.winLines = [
      {
        plot: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ],
        descripton: "top horizontal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
        ],
        descripton: "second horizontal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
        ],
        descripton: "third horizontal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 4],
          [1, 4],
          [2, 4],
          [3, 4],
        ],
        descripton: "bottom horizontal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ],
        descripton: "top bottom diagonal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 4],
          [1, 3],
          [2, 2],
          [3, 1],
        ],
        descripton: "bottom top diagonal",
        symbolArray: [],
      },
      {
        plot: [
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
        ],
        descripton: "first vertical",
        symbolArray: [],
      },
      {
        plot: [
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        descripton: "second vertical",
        symbolArray: [],
      },
      {
        plot: [
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
        ],
        descripton: "third vertical",
        symbolArray: [],
      },
      {
        plot: [
          [3, 1],
          [3, 2],
          [3, 3],
          [3, 4],
        ],
        descripton: "fourth vertical",
        symbolArray: [],
      },
    ];
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
        reelSymbol.position.set(
          reelSymbol.width * i,
          reelSymbol.height * y - reelSymbol.height
        );
      }
      containerToAppend.addChild(reelContainer);
    }

    //refine these values to be dynamic
    const maskWidth = containerToAppend.width;
    //const maskHeight = window.innerHeight - (headerHeight + footerHeight) ;

    console.log(headerHeight);
    console.log(containerToAppend);

    const maskShape = new PIXI.Graphics();
    maskShape.beginFill(0xffffff);

    maskShape.drawRect(
      window.innerWidth / 2 - maskWidth / 2,
      maskYPos - 2,
      maskWidth,
      maskHeight + 2
    );
    maskShape.endFill();
    const mask = new PIXI.MaskData(maskShape, "scissor", 0, 0);
    containerToAppend.mask = mask;
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
    callback
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
        if (callback) {
          this.assignSymbolsToWinLines(this.symbolContainer);
          callback();
        }
        return true;
      }
    }, 60);
  }
  assignSymbolsToWinLines(container) {
    this.winLines.forEach((element) => {
      element.symbolArray = [
        container.children[element.plot[0][0] + 1].children[element.plot[0][1]],
        container.children[element.plot[1][0] + 1].children[element.plot[1][1]],
        container.children[element.plot[2][0] + 1].children[element.plot[2][1]],
        container.children[element.plot[3][0] + 1].children[element.plot[3][1]],
      ];
    });
  }

  //ADD THIRD PROPERY WHICH IS INSIDE WINLINES : SYMBOLaRRAY
  checkWinLine(symbolValues, lineDescription, symbolArray) {
    /**
     * look at contents of array, if 3 or 4 in a row,
     * return line desription - used to identify the win line in a string message,
     * multiply each of the values against the reel assembly values to get the total
     */
    if (
      symbolValues[0] === symbolValues[1] &&
      symbolValues[1] === symbolValues[2] &&
      symbolValues[2] === symbolValues[3]
    ) {
      return ["FOUR IN A ROW! ", lineDescription, true, symbolArray, symbolValues];
    }
    if (
      symbolValues[0] !== symbolValues[1] &&
      symbolValues[1] === symbolValues[2] &&
      symbolValues[2] === symbolValues[3]
    ) {
      let nonMatchingSymbolRemoved = [symbolArray[1], symbolArray[2], symbolArray[3]];
      let symbolValuesMatching = [symbolValues[1], symbolValues[2], symbolValues[3]];
      return ["THREE IN A ROW! ", lineDescription, true, nonMatchingSymbolRemoved, symbolValuesMatching];
    }
    if (
      symbolValues[0] === symbolValues[1] &&
      symbolValues[1] === symbolValues[2] &&
      symbolValues[2] !== symbolValues[3]
    ) {
      let nonMatchingSymbolRemoved = [symbolArray[0],symbolArray[1],symbolArray[2]];
      let symbolValuesMatching = [symbolValues[0], symbolValues[1],symbolValues[2]];
      return ["THREE IN A ROW! ", lineDescription, true, nonMatchingSymbolRemoved, symbolValuesMatching];
    }

    return ["NO WIN", "no win", false, null, null];
  }

  checkAllWinLines() {
    console.clear();
    this.winLines.forEach((element) => {
      let resultArray = [];
      for (let x = 0; x < element.plot.length; x++) {
        resultArray.push(
          this.reelAssembly[element.plot[x][0]][element.plot[x][1]].value
        );
      }
      let result = this.checkWinLine(
        resultArray,
        element.descripton,
        element.symbolArray
      );
      if (result[2]) {
        this.animatorClass.winAnimator([result[3]]);
        let winAmount = ((result[4][1] + 1) *  100) * result[4].length;
        console.log();
        this.bankClass.balance += winAmount;
        // add score to balance

        console.log(result[0] + " " + result[1]);
      }
    });
  }
  
}
