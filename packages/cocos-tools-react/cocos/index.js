const ipcAdapter = require('../src/infrastructure/ipc/ElectronIpcAdapter');
const build_wanba_package = require('./build_wanba_package');
const adb_push_game = require('./adb/adb_push_game');
const {logger} = require("./cocos_editor_adapter");

// 构建玩吧资源包
const buildWanBaPackage = function (event, data) {        
    let buildWanbaPackage = new build_wanba_package();
    buildWanbaPackage.build(data.platform, data.debug);
}

// 推送游戏到设备
const pushGameToDevice = function (event, data) {
    let adbPushGame = new adb_push_game();
    adbPushGame.pushGame(data);
}


module.exports = {


    load() {
        Editor.log('构建资源包工具挂载');
        ipcAdapter.ipcMainOn('cocos-tools-react:wanBaBuild', buildWanBaPackage);
        ipcAdapter.ipcMainOn('cocos-tools-react:pushGameToDevice', pushGameToDevice);
    },
    unload() {
        Editor.log('构建资源包工具卸载');
        ipcAdapter.ipcMainOff('cocos-tools-react:wanBaBuild', buildWanBaPackage);
        ipcAdapter.ipcMainOff('cocos-tools-react:pushGameToDevice', pushGameToDevice);
    },

    messages: {
        'openReactPanel': function () {
            Editor.log('打开React面板');
            Editor.Panel.open('cocos-tools-react');
        },
    }
}