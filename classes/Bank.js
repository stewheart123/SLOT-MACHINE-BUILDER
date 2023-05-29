/**
 * Handles the balance and payout
 */
class Bank {
    constructor(balance) {
        this.balance = balance;
        this.collectedWinnings = 0;        
    }

    addFunds(addedFunds) {
        if(addedFunds > 0) {
            this.balance += addedFunds; 
        }
    }
    payout(withdraw) {
        if(withdraw === this.balance ) {
            this.balance -= withdraw;
        }
        this.collectedWinnings += widthdraw;        
    }
    
}