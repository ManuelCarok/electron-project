import { ipcRenderer } from 'electron';
import { addImagesEvents, selectFirstImage, clearImages, loadImages } from './images-ui';
import { saveImage } from './filters';
import path from 'path';

function setIpc() {
    ipcRenderer.on('load-images', (event, images) => {
        clearImages();
        loadImages(images);
        addImagesEvents();
        selectFirstImage();
    });

    ipcRenderer.on('save-image', (event, file) => {
        saveImage(file, (err) => {
            if(err) return showDialog('error', 'Electron', err.message)
            
            showDialog('info', 'Electron', 'Se guardo')
        });
    });
}

function openDirectory() {
    ipcRenderer.send('open-directory');
}

function saveFile() {

    const image = document.getElementById('image-displayed').dataset.original;
    const ext = path.extname(image);
    
    ipcRenderer.send('open-save-dialog', ext);
}

function showDialog(type, title, msg) {
    ipcRenderer.send('show-dialog', { type: type, title: title, message: msg });
}

module.exports = {
    setIpc: setIpc,
    saveFile: saveFile,
    openDirectory: openDirectory
}