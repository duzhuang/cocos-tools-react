class ElectronIpcAdapter {
    constructor() {
        this.ipcRenderer = require('electron').ipcRenderer;
        this.ipcMain = require('electron').ipcMain;
    }


    ipcMainOn(channel, callback) {
        this.ipcMain.on(channel, callback);
    }

    ipcMainOff(channel, callback) {
        this.ipcMain.off(channel, callback);
    }

    ipcRendererOn(channel, callback) {
        this.ipcRenderer.on(channel, callback);
    }

    ipcRendererOff(channel, callback) {
        this.ipcRenderer.off(channel, callback);
    }
}

module.exports = new ElectronIpcAdapter();
