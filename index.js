'use strict'

// Instanciando los objectos app y BrowserWindow
const { app, BrowserWindow } = require('electron');

// imprimiendo un mensaje por consola antes de salir
app.on('before-quit', () => {
    console.log('saliendo...');
});

// ejecutando ordenes cuando la app esta lista
app.on('ready', () => {

    // creando una ventana
    let win = new BrowserWindow({
        width: 800, // Ancho px
        height: 600, // Alto px
        title: 'Electron project', // Titulo de la ventana
        center: true, // Se muestre en el centro de la pantalla
        maximizable: false, // No se puede maximizar
        show: false, // Ventana invisible
    });

    // .once solo se ejecuta una vez, ready-to-show es el evento que se ejecuta cuando el contenido esta listo
    win.once('ready-to-show', () => {
        win.show(); // mostrar ventana
    });

    // dectectando cuando la ventana se mueve
    win.on('move', () => {
        const posicion = win.getPosition(); // Trae la posicion de la ventana
        console.log(`la posicion es ${ posicion }`);
    });

    // detectando el cierre de la ventana para cerrar la app
    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.loadURL('https://devdocs.io/'); // cargar una web en electron
});