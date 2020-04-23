let str = prompt('Enter word: ');
const strLen = str.length;
if(!str){
  alert('Invalid value'); 
}
let midChar = str.slice(Math.floor(strLen/2-0.1), Math.ceil(strLen/2+0.1));
alert(midChar);