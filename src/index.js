'use strict'

// Instanciando los objectos app y BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import devtools from './devtools';
import handleErrors from './handle-errors';
import isImage from 'is-image';
import filesize from 'filesize';
import fs from 'fs';
import path from 'path';

let win;

if (process.env.NODE_ENV === 'development') {
    devtools();
}

// imprimiendo un mensaje por consola antes de salir
app.on('before-quit', () => {
    console.log('saliendo...');
});

// ejecutando ordenes cuando la app esta lista
app.on('ready', () => {

    // creando una ventana
    win = new BrowserWindow({
        width: 1200, // Ancho px
        height: 600, // Alto px
        title: 'Electron project', // Titulo de la ventana
        center: true, // Se muestre en el centro de la pantalla
        maximizable: false, // No se puede maximizar
        show: false, // Ventana invisible
    });

    handleErrors(win);

    // .once solo se ejecuta una vez, ready-to-show es el evento que se ejecuta cuando el contenido esta listo
    win.once('ready-to-show', () => {
        win.show(); // mostrar ventana
    });

    // dectectando cuando la ventana se mueve
    // win.on('move', () => {
    //     const posicion = win.getPosition(); // Trae la posicion de la ventana
    //     console.log(`la posicion es ${ posicion }`);
    // });

    // detectando el cierre de la ventana para cerrar la app
    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.loadURL(`file://${ __dirname }/renderer/index.html`); // cargar un archivo html local
    // win.loadURL('https://devdocs.io/'); // cargar una web en electron
    win.toggleDevTools();
});

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