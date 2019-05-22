import { ipcMain, dialog } from 'electron';
import isImage from 'is-image';
import filesize from 'filesize';
import fs from 'fs';
import path from 'path';

function setMainIpc(win) {
    ipcMain.on('open-directory', (event) => {
        dialog.showOpenDialog(win, {
            title: 'Seleccione la nueva ubicacion',
            buttonLabel: 'Abrir ubicación',
            properties: ['openDirectory']
        }, (dir) => {
            const images = [];
    
            if (dir) {
                fs.readdir(dir[0], (err, files) => {
                    if (err) throw err;
    
                    for (var index = 0; index < files.length; index++) {
                        if (isImage(files[index])) {
                            let imageFile = path.join(dir[0], files[index]);
                            let stats = fs.statSync(imageFile);
                            let size = filesize(stats.size, { round: 0 });
                            images.push({
                                name: files[index],
                                src: `file://${ imageFile }`,
                                size: size
                            });
                        }
                    }
    
                    event.sender.send('load-images', images);
                });
            }
        });
    });

    ipcMain.on('open-save-dialog', (event, ext) => {    
        dialog.showSaveDialog(win, {
            title: 'Guardar Imagen',
            buttonLabel: 'Guardar',
            filters: [{ name: 'Images', extensions: [ext.substr(1)] }]
        }, (file) => {
            if (file) {
                event.sender.send('save-image', file);
            }
        });
    });

    ipcMain.on('show-dialog', (event, info) => {
        dialog.showMessageBox(win, {
            type: info.type,
            title: info.title,
            message: info.message
        })
    });
}

module.exports = setMainIpc;