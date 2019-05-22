import { app, dialog } from 'electron';

function relaunchApp(win) {
    dialog.showMessageBox(win, {
        type: 'error',
        title: 'Electron',
        message: 'Error inesperado, se reiniciará la app'
    }, () => {
        app.relaunch();
        app.exit(0);
    });
}

function setupErrors(win) {
    win.webContents.on('crashed', () => {
        relaunchApp(win);
    });

    win.on('unresponsive', () => {
        dialog.showMessageBox(win, {
            type: 'warning',
            title: 'Electron',
            message: 'Un proceso esta tardando, puede esperar o reiniciar'
        });
    })

    process.on('uncaughtException', () => {
        relaunchApp(win);
    })
}

module.exports = setupErrors;