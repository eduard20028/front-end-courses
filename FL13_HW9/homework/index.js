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
        if(!isNaN(parseInt(arr[i]))){
            arr[i] = parseInt(arr[i]);
        }
        callback(arr[i]);
    }
}

let mapArray = (arr, callback) => {
    let res = [];
    executeforEach(arr, (el) => {
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
    let k = rangeArr[0];
    while(k <= rangeArr[1]){
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
    let min = 10, 
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
    const limNum = 10;
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes();

    if(month < limNum){ 
        month = '0' + month; 
    }
    if(day < limNum){ 
        day = '0' + day;
    }
    if(hours < limNum){ 
        hours = '0' + hours; 
    }
    if(minutes < limNum){ 
        minutes = '0' + minutes;
    }

    return `${year}/${month}/${day} ${hours}:${minutes}`
}
