let answ = confirm('Do you want to play a game?');
if(answ){
    let maxNum = 5, pocketNum, attempts = 3, totalPrize = 0, prize = 100, currPrize = prize;
    
    while(answ){
        pocketNum = Math.round(Math.random()*maxNum);
        while(attempts){
            let userNum = +prompt('Choose a roulette pocket number from 0 to ' + maxNum + 
                                '\nAttempts left: ' + attempts + 
                                '\nTotalPrize: ' + totalPrize + '$' +
                                '\nPossible prize on current attempt: ' + currPrize + '$');
            if(userNum === pocketNum){
                answ = confirm('Congratulation, you won!\nYour prize is: ' + currPrize + '$' +
                                '\nDo you want to continue?');
                totalPrize += currPrize;
                if(!answ){
                    alert('Thank you for your participation.\nYour prize is:' + totalPrize + '$')
                } else{
                    prize *= 2;
                    currPrize = prize;
                    attempts = 3;
                    maxNum *= 2;
                }
            } else{
                currPrize /= 2;
                attempts--;
            }
        }
        if(attempts === 0){
            alert('Thank you for your participation.\nYour prize is: ' + totalPrize + '$');
            answ = confirm('Do you want to play again?');
            totalPrize = 0;
            prize = 100;
            currPrize = prize;
            attempts = 3;
            maxNum = 5;
        } 
    }
} else{
    alert('You did not become a billionaire, but can.');
}