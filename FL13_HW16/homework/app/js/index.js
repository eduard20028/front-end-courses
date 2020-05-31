const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
    
class View{
    constructor(appRef){
        this._appRef = appRef;
        this._appRef.innerHTML = `
            <h1 class="app-title">Manage user app</h1>
            <form id="manage-form" name="user">
                <input type="text" placeholder="User Name" name="username">
                <input type="text" placeholder="Full Name" name="name">
                <input type="submit" value="Add New User" name="add">
            </form>
            <div id="user-container" class="user-list">
                <div class="user-list__container"></div>
            </div>`
        const manageForm = this._appRef.querySelector('#manage-form');
        manageForm.onsubmit = (e) => {
            addUser();
            e.preventDefault();
        }
    }
    createUserItem ({id, name, username}) {
        let item = document.createElement('div');
        item.id = 'user';
        item.innerHTML = `
                <p id="user-id">${id}</p>
                <input id="name" type="text" value="${name}">
                <input id="user-name" type="text" value="${username}">
                <input id="update-btn" type="button" value="Update">
                <input id="delete-btn" type="button" value="Delete">`
        return item;
    }
    renderUserList (users, handler) {
        const userContainer = this._appRef.querySelector('#user-container');
        users.forEach(user => {
            userContainer.append(this.createUserItem(user));
        })
        userContainer.onclick = handler;
    }
}

const view = new View(appContainer);

function userContainerHandler (e) {
    if (e.target.id === 'delete-btn') {
        const parent = e.target.parentNode;
        let userId = parent.querySelector('#user-id').textContent,
            inputNode = parent.querySelectorAll('input');
        inputNode.forEach(input => {
            input.setAttribute('disabled', 'disabled');
        })
        removeUser(userId);
    } else if (e.target.id === 'update-btn') {
        const parent = e.target.parentNode;
        let userId = parent.querySelector('#user-id').textContent,
            inputNode = parent.querySelectorAll('input'),
            name = parent.querySelector('input#name').value,
            userName = parent.querySelector('input#user-name').value;
        inputNode.forEach(input => {
           input.setAttribute('disabled', 'disabled');
        })
        updateUser(userId, userName, name);
    }
}

function transferLoading () {
    const userContainer = document.getElementById('user-container');
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerText = 'Loading...';
    userContainer.innerHTML = '';
    userContainer.append(loader);
}

function getUsers () {
    let users;
    const xhr = new XMLHttpRequest();

    xhr.onloadstart = transferLoading;
    xhr.onload = () => {
        const getStatus = 200;
        if (xhr.status !== getStatus) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            users = JSON.parse(xhr.response);
            document.getElementById('loader').hidden = true;
            view.renderUserList(users, userContainerHandler);
        }
    }
    
    xhr.open('GET', `${baseUrl}/users`);
    xhr.send();
}

function addUser () {
    const xhr = new XMLHttpRequest();

    let name = document.forms.user.name.value,
        username = document.forms.user.username.value;

    let addBtn = document.forms.user.add;
        addBtn.setAttribute('disabled', 'disabled');

    xhr.onloadend = getUsers;
    xhr.onload = () => {
        const postStatus = 201;
        if (xhr.status !== postStatus) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            addBtn.removeAttribute('disabled');
        }
    }

    xhr.open('POST', `${baseUrl}/users` );
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify({
        name: name,
        username: username
    }));
}

function removeUser (userId) {
    const xhr = new XMLHttpRequest();
    
    xhr.onloadend = getUsers;
    xhr.onload = () => {
        const deleteStatus = 204;
        if (xhr.status !== deleteStatus) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    xhr.open('DELETE', `${baseUrl}/users/${userId}`);
    xhr.setRequestHeader('Authorization', 'admin');
    xhr.send();
}

function updateUser (userId, userName, name) {
    const xhr = new XMLHttpRequest();

    xhr.onloadend = getUsers;
    xhr.onload = () => {
        const putStatus = 204;
        if (xhr.status !== putStatus) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    xhr.open('PUT', `${baseUrl}/users/${userId}` );
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify({
        name: name,
        username: userName
    }));
}

document.addEventListener('DOMContentLoaded', getUsers);