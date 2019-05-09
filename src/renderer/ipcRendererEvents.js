import { ipcRenderer } from 'electron';
import { addImagesEvents, changeImage, selectFirstImage } from './images-ui';

function clearImages() {
    const oldImages = document.querySelectorAll('li.list-group-item');

    for (let i = 0; i < oldImages.length; i++) {
        oldImages[i].parentNode.removeChild(oldImages[i]);
    }
}

function loadImages(images) {
    const imagesList = document.querySelector('ul.list-group');
    for (let i = 0; i < images.length; i++) {
        const node = `<li class="list-group-item">
                            <img class="media-object pull-left" src="${ images[i].src }" width="32" height="32">
                            <div class="media-body">
                                <strong>${ images[i].name }</strong>
                                <p>${ images[i].size }</p>
                            </div>
                        </li>`;
        imagesList.insertAdjacentHTML('beforeend', node);
    }
}

function addImagesEvents() {
    const thumbs = document.querySelectorAll('li.list-group-item');

    for (let i = 0, lengthT = thumbs.length; i < lengthT; i++) {
        thumbs[i].addEventListener('click', function() {
            changeImage(this)
        });
    }
}

function changeImage(nodo) {
    if (nodo) {
        const selected = document.querySelector('li.selected');
        if (selected) {
            selected.classList.remove('selected');
        }

        nodo.classList.add('selected');
        document.getElementById('image-displayed').src = nodo.querySelector('img').src;
    } else {
        document.getElementById('image-displayed').src = '';
    }
}

function selectFirstImage() {
    const img = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(img);
}

function setIpc() {
    ipcRenderer.on('load-images', (event, images) => {
        clearImages();
        loadImages(images);
        addImagesEvents();
        selectFirstImage();
    });
}

function openDirectory() {
    ipcRenderer.send('open-directory');
}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}