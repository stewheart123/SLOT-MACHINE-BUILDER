
/**
 * Determines the state of the game
 * set the cost of 1 spine
 * looks at the bank balance to determine if able to continue
 */
class GameState {
    constructor(spinPrice, bankClass) {
        this.state = null;
        this.remainingSpins = null;
        this.spinPrice = spinPrice; 
        this.bankClass = bankClass;
        this.remainingSpins = this.determineSpinsLeft();
        this.checkCanSpin = this.checkCanSpin;
    }
    setSpinning(spinDescription) {
        this.state = spinDescription;
    }
    determineSpinsLeft(){
        console.log(this.bankClass.balance / this.spinPrice);
        return this.bankClass.balance / this.spinPrice;
    }
    checkCanSpin() {
        console.log('check can spin');
        if(this.remainingSpins > 0) {
            return(true);
        }
        else {
            return(false);
        }
    }
    //update bank balance
    //update remaining spins
    //


    
    
}