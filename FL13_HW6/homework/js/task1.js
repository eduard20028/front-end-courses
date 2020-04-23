let check = parseInt(prompt('Enter check number: '));
let tip = parseInt(prompt('Enter tip percentage'));

if(Number.isInteger(check+tip)&&check > 0&&tip > 0&&tip < 100){
  let totalSum = parseFloat((check/100 * tip + check).toFixed(2));
  alert(totalSum);
} else{
  alert('Invalid value');
}