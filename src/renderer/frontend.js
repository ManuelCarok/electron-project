import os from 'os';
import { setIpc, openDirectory } from './ipcRendererEvents';
import { setIpc, openDirectory } from './ipcRendererEvents';
import { addImagesEvents, searImagesEvent, selectEvent } from './images-ui';

window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = "este es un mensaje";
    // console.log(os.cpus());
    setIpc();
    addImagesEvents();
    searImagesEvent();
    selectEvent();
    buttonEvent('open-directory', openDirectory);
});

function buttonEvent(id, func) {
    const open = document.getElementById(id);

    open.addEventListener('click', func);
}