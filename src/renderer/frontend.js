import os from 'os';
import url from 'url';
import path from 'path';

window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = "este es un mensaje";
    console.log(os.cpus());
    addImagesEvents();
    searImagesEvent();
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
    document.querySelector('li.selected').classList.remove('selected');
    nodo.classList.add('selected');
    document.getElementById('image-displayed').src = nodo.querySelector('img').src;
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
        }
    });
}

function selectFirstImage() {
    const img = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(img);
}