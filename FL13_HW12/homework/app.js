const root = document.getElementById('root');

let defaultState = () => {
    let action, uid,
        locationProps = location.href.match(/(\?|#).+/, '')[0];
    if (locationProps.includes('#') && locationProps.includes('?')) {
        locationProps = locationProps.split('#');
        action = locationProps[1];
        uid = locationProps[0].replace(/.+[^\d+]/, '');
    } else if (locationProps.includes('#')) {
        action = locationProps.split('#')[1];
    } else {
        action = '';
        uid = '';
    }
    changeHash(action, uid)
}

let updateState = (state) => {
    let infoSection = document.querySelector('section.info-section');
    if(!state){
        infoSection.innerHTML = '<h1>Choose book</h1>';
        return;
    }
    if(state.action === 'preview') {
        let previewTab = document.createElement('preview-tab');
            previewTab.book = localStorageUtil.getBook(state.id);
            if (previewTab.book) {
                infoSection.innerHTML = '';
                infoSection.append(previewTab);
            } else {
                changeHash();
            }
    } else if(state.action === 'edit') {
        let editTab = document.createElement('edit-tab');
            editTab.book = localStorageUtil.getBook(state.id);
            if (editTab.book) {
                infoSection.innerHTML = '';
                infoSection.append(editTab);
            } else {
                changeHash();
            }
    } else if(state.action === 'add') {
        let addTab = document.createElement('add-tab');
            infoSection.innerHTML = '';
            infoSection.append(addTab);
    } else {
        changeHash();
    }
}

let changeHash = (action, uid) => {
    let newState = {
        page: 'index.html'
    };
    if(history.state && history.state.action === action && history.state.id === uid){
        return;
    }
    newState.action = action;
    newState.id = uid;
    if (action === 'add' && !uid) {
        newState.page += '#' + action;
    } else if (action === 'edit' || action === 'preview') {
        newState.page += `?id=${uid}#${action}`;
    } else {
        alert('Incorrect URL!');
    }
    history.pushState(newState, '', newState.page);
    updateState(newState);
}

window.addEventListener('popstate', () => {
    if(!history.state){
        defaultState();
    } else {
        updateState(history.state);
    }
})
window.addEventListener('load', () => {
    if(!history.state){
        defaultState();
    } else {
        updateState(history.state);
    }
})

class LocalStorageUtil{
    constructor() {
        this.keyName = 'bookList';
    }
    getBook(id) {
        const books = JSON.parse(localStorage.getItem(this.keyName));
        return books.find((el) => el.id === id)||false;
    }
    getBookList() {
        const booksLocalStorage = JSON.parse(localStorage.getItem(this.keyName));
        if(booksLocalStorage === null){
            return [];
        }
        return booksLocalStorage;
    }
    putBook(id) {
        let books = this.getBookList();
        books.push(id);
        localStorage.setItem(this.keyName, JSON.stringify(books));
    }
    editBook(item) {
        let books = this.getBookList();
        const elId = books.findIndex(el => el.id === item.id);
        books[elId] = item;
        localStorage.setItem(this.keyName, JSON.stringify(books));
    }
}

const localStorageUtil = new LocalStorageUtil();

class BookList extends HTMLElement{
    connectedCallback(){
        const data = localStorageUtil.getBookList();
        let ul = document.createElement('ul'),
            btn = document.createElement('button'),
            div = document.createElement('div');
            ul.classList.add('books-container');
            btn.classList.add('btn', 'btn-add');
            div.classList.add('btn-container');
            btn.textContent = 'Add';
        div.append(btn);  
        div.addEventListener('click', () => {
            changeHash('add');
        })
        data.forEach((bookData) => {
            let bookItem = document.createElement('book-item');
            bookItem.data = bookData;
            ul.append(bookItem);
        })
        this.append(ul, div);
    }
}

customElements.define('book-list', BookList);

class BookItem extends HTMLElement{
    connectedCallback(){
        const {title, img, id} = this.data;
        this.innerHTML = `<li id=${id} class="books-item">
                            <img class="books-item__img" src="${img}"/>
                            <span class="books-item__title books-info">${title}</span>
                          </li>`
        this.firstChild.addEventListener('click', () => {
            changeHash('preview', this.firstChild.id);
        })
    }
}

customElements.define('book-item', BookItem);

class InfoSection extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<section class="info-section">
                            <h1>Choose book</h1>
                          </section>`
    }
}

customElements.define('info-section', InfoSection);

class PreviewTab extends HTMLElement{
    connectedCallback(){
        const {id, title, img, author, plot} = this.book;
        this.innerHTML = `<div class="card-container">
                            <h1 class="card-item__title">Title: ${title}</h1>
                            <img class="card-item__img" src="${img}"/>
                            <span class="card-item__author">Author: ${author}</span>
                            <p class="card-item__plot">Plot: ${plot}</p>
                            <div class="card-item__wrapp">
                                <button class="btn btn-edit">Edit</button>
                            </div>
                          </div>`
        this.firstChild.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON'){
                return;
            }
            changeHash('edit', id);
        })
    }
}

customElements.define('preview-tab', PreviewTab);

class AddTab extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<div class="form-container">
                            <form class="form">
                                <div class="form-item">
                                    <label class="form-item__label" for="title">Title:</label>
                                    <input required class="form-item__input" type="text" id="title">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="img">Img url:</label>
                                    <input required class="form-item__input" type="url" id="img">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="author">Author:</label>
                                    <input required class="form-item__input" type="text" id="author">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="plot">Plot:</label>
                                    <textarea required class="form-item__text" type="text" id="plot">
                                    </textarea>
                                </div>
                                <div class="form-item__wrapp">
                                    <button type="submit" class="btn btn-save">Save</button>
                                </div>
                            </form>
                        </div>`
        this.firstChild.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-save')) {
                let currTitle = document.querySelector('input#title').value.trim(),
                    currImg = document.querySelector('input#img').value.trim(),
                    currAuthor = document.querySelector('input#author').value.trim(),
                    currPlot = document.querySelector('textarea#plot').value.trim(),
                    id = Math.floor(Math.random() * 200) + 100,
                    timeoutMs = 3000;
                if(currTitle.length&&currImg.length&&currAuthor.length&&currPlot.length){
                    setTimeout(() => alert('Book successfully added'), timeoutMs);
                    localStorageUtil.putBook({
                        id: `${id}`,
                        author: currAuthor,
                        title: currTitle,
                        img: currImg,
                        plot: currPlot
                    })
                    root.innerHTML = `<div class="container"><book-list></book-list><info-section/></div>`;
                }
            } 
        })

        let form = document.querySelector('form.form');
            form.onsubmit = (e) => {
                e.preventDefault();
            }
    }
}

customElements.define('add-tab', AddTab);

class EditTab extends HTMLElement{
    connectedCallback(){
        const {id, title, img, author, plot} = this.book;
        this.innerHTML = `<div class="form-container">
                            <form class="form">
                                <div class="form-item">
                                    <label class="form-item__label" for="title">Title:</label>
                                    <input required class="form-item__input" value="${title}" type="text" id="title">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="img">Img url:</label>
                                    <input required class="form-item__input" value="${img}" type="url" id="img">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="author">Author:</label>
                                    <input required class="form-item__input" value="${author}" type="text" id="author">
                                </div>
                                <div class="form-item">
                                    <label class="form-item__label" for="plot">Plot:</label>
                                    <textarea required class="form-item__text" type="text" id="plot">${plot}
                                    </textarea>
                                </div>
                                <div class="form-item__wrapp">
                                    <button type="submit" class="btn btn-save">Save</button>
                                    <button class="btn btn-canc">Canсel</button>
                                </div>
                            </form>
                          </div>`
        this.firstChild.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-save')) {
                let currTitle = document.querySelector('input#title').value.trim(),
                    currImg = document.querySelector('input#img').value.trim(),
                    currAuthor = document.querySelector('input#author').value.trim(),
                    currPlot = document.querySelector('textarea#plot').value.trim(),
                    timeoutMs = 3000;
                localStorageUtil.editBook({
                    id: id,
                    author: currAuthor,
                    title: currTitle,
                    img: currImg,
                    plot: currPlot
                })
                if(currTitle&&currImg&&currAuthor&&currPlot){
                    root.innerHTML = `<div class="container"><book-list></book-list><info-section/></div>`;
                    changeHash('preview', id);
                    setTimeout(() => alert('Book successfully updated'), timeoutMs);
                }
            } else if (target.classList.contains('btn-canc')) {
                if(confirm('Discard changes?')){
                    updateState(history.state);
                }
            }
        })
        let form = document.querySelector('form.form');
            form.onsubmit = (e) => {
                e.preventDefault();
            }
    }
}


customElements.define('edit-tab', EditTab);

root.innerHTML = `<div class="container"><book-list></book-list><info-section/></div>`;

