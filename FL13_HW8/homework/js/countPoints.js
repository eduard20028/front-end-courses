import isBigger from './isBigger.js';

let countPoints = (scoreArr) => {
    let points = 0;
    scoreArr.map(x => x.split(':')).forEach((arr) => {
        let x = arr[0], y = arr[1];
        if(x <= 4 && y <= 4 && y >= 0 && x >= 0){
            if(x === y){
                points += 1;
            } else if(isBigger(x, y)){
                points += 3;
            }
        }
    })
    return points;
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0'])
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0'])