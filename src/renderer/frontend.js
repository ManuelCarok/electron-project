import os from 'os';
import url from 'url';
import path from 'path';
import applyFilter from './filters';
import { setIpc, sendIpc } from './ipcRendererEvents';

window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = "este es un mensaje";
    // console.log(os.cpus());
    setIpc();
    addImagesEvents();
    searImagesEvent();
    selectEvent();
    openDirectory();
});

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
        document.querySelector('li.selected').classList.remove('selected');
        nodo.classList.add('selected');
        document.getElementById('image-displayed').src = nodo.querySelector('img').src;
    } else {
        document.getElementById('image-displayed').src = '';
    }
}

function searImagesEvent() {
    const searchBox = document.getElementById('search-box');

    searchBox.addEventListener('keyup', function() {
        const regex = new RegExp(this.value.toLowerCase(), 'gi');

        if (this.value.length > 0) {
            const thumbs = document.querySelectorAll('li.list-group-item img');

            for (let i = 0, lengthT = thumbs.length; i < lengthT; i++) {
                const fileUrl = url.parse(thumbs[i].src);
                const fileName = path.basename(fileUrl.pathname);

                if (fileName.match(regex)) {
                    thumbs[i].parentNode.classList.remove('hidden');
                } else {
                    thumbs[i].parentNode.classList.add('hidden');
                }
            }

            selectFirstImage();
        } else {
            const thumbs = document.querySelectorAll('li.hidden');

            for (let i = 0, lengthT = thumbs.length; i < lengthT; i++) {
                thumbs[i].classList.remove('hidden');
            }

            selectFirstImage();
        }
    });
}

function selectFirstImage() {
    const img = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(img);
}

function selectEvent() {
    const select = document.getElementById('filters');

    select.addEventListener('change', function() {
        applyFilter(this.value, document.getElementById('image-displayed'));
    })
}

function openDirectory() {
    const open = document.getElementById('open-directory');

    open.addEventListener('click', () => {
        sendIpc();
    });
}