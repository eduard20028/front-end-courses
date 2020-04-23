let getMiddleChar = () => {
    let str = prompt('Enter word: ').trim();
    const strLen = str.length;
    if(!strLen){
      alert('Invalid value'); 
      return 0;
    }
    let midChar = str.slice(Math.floor(strLen/2-0.1), Math.ceil(strLen/2+0.1));
    alert(midChar);
  }
getMiddleChar();
