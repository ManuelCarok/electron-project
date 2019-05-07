import os from 'os';

window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = "este es un mensaje";
    console.log(os.cpus());
    addImagesEvents();
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