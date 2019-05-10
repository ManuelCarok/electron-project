import { ipcRenderer } from 'electron';
import { addImagesEvents, selectFirstImage, clearImages, loadImages } from './images-ui';
import path from 'path';

function setIpc() {
    ipcRenderer.on('load-images', (event, images) => {
        clearImages();
        loadImages(images);
        addImagesEvents();
        selectFirstImage();
    });

    ipcRenderer.on('save-image', (event, file) => {
        console.log(file);

    })
}

function openDirectory() {
    ipcRenderer.send('open-directory');
}

function saveFile() {

    // const image = document.getElementById('image-displayed').dataset.original;
    // const ext = path.extname(image);

    ipcRenderer.send('open-save-dialog', 'ext');
}

module.exports = {
    setIpc: setIpc,
    saveFile: saveFile,
    openDirectory: openDirectory
}