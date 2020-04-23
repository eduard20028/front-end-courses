let getCheck = () => {
    let check = parseInt(prompt('Enter check number: '));
    if(Number.isInteger(check)&&check > 0){
      return check;
    } else{
      alert('Invalid input data');
      throw 'Invalid input data';
    }
  }
  let getTip = () => {
    let tip = parseInt(prompt('Enter tip percentage'));
    if(Number.isInteger(tip)&&tip > 0&&tip < 100){
      return tip;
    } else{
      alert('Invalid input data');
      throw 'Invalid input data';
    }
  }
  let showTotalSum = () => {
    let c = getCheck();
    let t = getTip();
    if(c+t){
      let totalSum = parseFloat((c/100 * t + c).toFixed(2));
      alert(totalSum);
    }
  }
showTotalSum();