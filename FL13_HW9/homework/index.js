let convert = (...arr) => {
    for(let i = 0; i < arr.length; i++){
        if(typeof arr[i] === 'string'){
            arr[i] = parseInt(arr[i]);
        } else {
            arr[i] = String(arr[i]);
        }
    } 
    return arr;
}

let executeforEach = (arr, callback) => {
    for(let i = 0; i < arr.length; i++){
        callback(arr[i]);
    }
}

let mapArray = (arr, callback) => {
    let res = [];
    executeforEach(arr, (el) => {
        if(!isNaN(parseInt(el))){
            el = parseInt(el);
        }
        res.push(callback(el));
    });
    return res;
}

let filterArray = (arr, callback) => {
    let res = [];
    executeforEach(arr, (el) => {
        if(callback(el)){
            res.push(el);
        }
    })
    return res;
} 

let containsValue = (arr, item) => {
    let res = false;
    executeforEach(arr, (el) => {
        if(el === item){
            res = true;
        }
    });
    return res;
}

let flipOver = (str) => {
    let res = '';
    for(let i = str.length-1; i >= 0; i--){
        res += str[i];
    }
    return res;
}

let makeListFromRange = (rangeArr) => {
    let res = [];
    let k = rangeArr[0] > rangeArr[1] ? rangeArr[1] : rangeArr[0],
        i = rangeArr[0] > rangeArr[1] ? rangeArr[0] : rangeArr[1];
    while(k <= i){
        res.push(k);
        k++;
    }
    return res;
}

let getArrayOfKeys = (fruitArr, key) => {
    let res = [];
    executeforEach(fruitArr, (el) => {
        if(el[key]){
            res.push(el[key]);
        }
    });
    return res;
}

let substitute = (numArr) => {
    const min = 10, 
          max = 20;
    return mapArray(numArr, (el) => el < max && el > min ? '*' : el)
}

let getPastDay = (date, dayAgo) => {
    const h = 24,
          m = 60,
          s = 60,
          ms = 1000;
    let dayMs = dayAgo * h * m * s * ms,
        dateMs = date.getTime();
    return new Date(dateMs - dayMs).getDate();
}

let formatDate = (date) => {
    let options = {
        hour: '2-digit', 
        minute: '2-digit'
    }
    return date.toLocaleDateString('en-ZA') + ' ' + date.toLocaleTimeString('en-ZA', options);
}
