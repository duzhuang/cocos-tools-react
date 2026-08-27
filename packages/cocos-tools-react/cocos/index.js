const ipcAdapter = require('../src/infrastructure/ipc/ElectronIpcAdapter');
const build_wanba_package = require('./build_wanba_package');
const adb_push_game = require('./adb/adb_push_game');
const {logger} = require("./cocos_editor_adapter");
const path = require('path');
const fs = require('fs');

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


/**
 * 加载文件统计信息
 * 在前端代码无法调用 Node.js 的原生 fs（文件系统）模块。
 * 需要通过 IPC 调用主进程的 fs 模块来获取文件统计信息。
 * @param {*} event 
 * @param {*} data 
 */
const loadFileStat = function (event, data) {        
    let item = data.item;
    let fsData = fs.statSync(item.path);
    item.size = fsData.size;
    event.reply(null, item);
}


module.exports = {

    load() {        
        Editor.log('构建资源包工具挂载');                
        ipcAdapter.ipcMainOn('cocos-tools-react:wanBaBuild', buildWanBaPackage);
        ipcAdapter.ipcMainOn('cocos-tools-react:pushGameToDevice', pushGameToDevice);
        ipcAdapter.ipcMainOn('cocos-tools-react:fs-stat', loadFileStat);

        // 🚀 顺水推舟：既然每次代码变化，Cocos 挂载完工具都会走到 load()，
        // 说明最新打包的代码已经写进硬盘了。我们直接在这里通知打开的网页刷新！
        setTimeout(() => {
            let win = Editor.Panel.findWindow('cocos-tools-react');
            if (win && win.nativeWin && win.nativeWin.webContents) {
                Editor.log('⚡ [Auto Reload] 检测到工具重新挂载，正在刷新 React 页面...');
                win.nativeWin.webContents.reload();
            }
        }, 100); // 稍微延迟 100ms 保证页面刷得稳
    },
    unload() {
        Editor.log('构建资源包工具卸载');
        ipcAdapter.ipcMainOff('cocos-tools-react:wanBaBuild', buildWanBaPackage);
        ipcAdapter.ipcMainOff('cocos-tools-react:pushGameToDevice', pushGameToDevice);  
        ipcAdapter.ipcMainOff('cocos-tools-react:fs-stat', loadFileStat);     
    },

    messages: {
        'openReactPanel': function () {            
            Editor.Panel.open('cocos-tools-react');
        },
    }
}