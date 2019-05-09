import { ipcRenderer } from 'electron';

function setIpc() {
    ipcRenderer.on('pong', (event, arg) => {
        console.log(`pong - ${ arg }`);
    });
}

function openDirectory() {
    ipcRenderer.send('open-directory', new Date());
}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}