const data = [{
  'folder': true,
  'title': 'Pictures',
  'children': [{
      'title': 'logo.png'
  }, {
      'folder': true,
      'title': 'Vacations',
      'children': [{
          'title': 'spain.jpeg'
      }]
  }]
}, {
  'folder': true,
  'title': 'Desktop',
  'children': [{
      'folder': true,
      'title': 'screenshots',
      'children': null
  }]
}, {
  'folder': true,
  'title': 'Downloads',
  'children': [{
      'folder': true,
      'title': 'JS',
      'children': null
  }, {
      'title': 'nvm-setup.exe'
  }, {
      'title': 'node.exe'
  }]
}, {
  'title': 'credentials.txt'
}];

const rootNode = document.getElementById('root'),
  rootFolder = document.createElement('ul');
rootFolder.classList.add('root-folder');
rootNode.append(rootFolder);

const createFolderTree = (folderObj, rootFolder) => {
  folderObj.forEach(file => {
      let li = document.createElement('li'),
          span = document.createElement('span'),
          input = document.createElement('input'),
          i = document.createElement('i'),
          isFolder = file.folder,
          isEmpty = !file.children;
      input.value = file.title;
      span.classList.add('folder-info');
      i.classList.add('material-icons');
      input.classList.add('folder-name');
      input.setAttribute('readonly', 'readonly');
      span.append(i, input);
      li.append(span);
      rootFolder.append(li);
      if (isFolder) {
          let childFolder = document.createElement('ul'),
              folderItem = document.createElement('li');
          childFolder.hidden = true;
          i.innerText = 'folder';
          i.classList.add('icon-fold');
          if (!isEmpty) {
              li.classList.add('folder');
              li.append(childFolder);
              createFolderTree(file.children, childFolder);
          } else if (isEmpty) {
              li.classList.add('folder');
              folderItem.textContent = 'Folder is empty';
              childFolder.classList.add('empty-folder');
              childFolder.append(folderItem);
              li.append(childFolder);
          }
      } else {
          i.innerText = 'insert_drive_file';
          i.classList.add('icon-file');
      }
  })
}

const createContextMenu = () => {
  let ul = document.createElement('ul');
  rootNode.append(ul);
  const menuLen = 2;
  ul.classList.add('context-menu');
  for (let i = 0; i < menuLen; i++) {
      ul.append(document.createElement('li'));
  }
  ul.children[0].classList.add('rename-item');
  ul.children[1].classList.add('delete-item');
  ul.children[0].innerText = 'Rename item';
  ul.children[1].innerText = 'Delete item';
}

createContextMenu();
createFolderTree(data, rootFolder);

rootFolder.onclick = (event) => {
  let target = event.target.closest('span');
  if (target && target.tagName === 'SPAN') {
      let childItem = target.parentNode.querySelector('i'),
          childFolder = target.parentNode.querySelector('ul');
      if (childItem.textContent === 'folder' || childItem.textContent === 'folder_open') {
          childItem.textContent === 'folder' ? childItem.innerText = 'folder_open' : childItem.innerText = 'folder';
          childFolder.hidden = !childFolder.hidden;
      }
  }
}

let menu = document.querySelector('.context-menu'),
    currInput;

rootNode.addEventListener('contextmenu', event => {
  let target = event.target;
  event.preventDefault();
  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  if (target.tagName === 'INPUT') {
      menu.classList.add('active');
      menu.classList.remove('disable');
      currInput = target;
  } else {
      menu.classList.add('disable');
      menu.classList.add('active');
  }
})

menu.addEventListener('click', event => {
  event.stopPropagation();
}, false)

document.addEventListener('click', event => {
  const rightMouseBtn = 2;
  if (event.button !== rightMouseBtn) {
      menu.classList.remove('active');
      if (currInput) {
          currInput.setAttribute('readonly', 'readonly');
      }
  }
}, false)

document.querySelector('.rename-item').addEventListener('click', () => {
  if(menu.classList.contains('disable')){
    return;
  }
  let dotId = currInput.value.indexOf('.');
  currInput.removeAttribute('readonly');
  currInput.focus();
  currInput.select();
  currInput.setSelectionRange(0, dotId);
})

document.querySelector('.delete-item').addEventListener('click', (event) => {
  if(menu.classList.contains('disable')){
    return;
  }
  let parentFolder = currInput.closest('ul');
  const rightMouseBtn = 2;
  menu.classList.remove('active');
  if (event.button !== rightMouseBtn) {
      currInput.closest('li').remove();
      if(!parentFolder.children.length){
        let folderItem = document.createElement('li');
        folderItem.textContent = 'Folder is empty';
        parentFolder.classList.add('empty-folder');
        parentFolder.append(folderItem);
      }
  }
})