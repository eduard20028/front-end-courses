let dateHours = new Date().getHours();
let minLoginLen = 4;
let password;

let login = prompt('Enter your login: ')||alert('Canceled.');
if(login){
    if(login.length < minLoginLen){
        alert("I don't know any users having name length less than 4 symbols");
    } else if(login === 'User'||login === 'Admin'){
        password = prompt('Enter your password: ')||alert('Canceled.');
    } else{
        alert('I don’t know you')
    }
}
if(password){
    if(password === 'UserPass'&&login === 'User'||login === 'Admin'&&password === 'RootPass'){
        if(dateHours < 20){
            alert('Good day, dear ' + login + '!');
        } else if(dateHours > 20){
            alert('Good evening, dear ' + login + '!');
        }
    } else{
        alert('Wrond password.');
    }
}
