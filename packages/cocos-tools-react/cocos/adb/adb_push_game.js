const adb_push_tool = require("./adb_push_tool");
const { logger } = require('../cocos_editor_adapter');
/**
 * 推送游戏
 */
class adb_push_game {
    // 推送文件工具
    m_adbPushTool = null;        

    constructor() {
        this.logger = logger;
        this.m_adbPushTool = new adb_push_tool();
    }


    async pushGame(data) {   
        this.logger.success(`开始推送游戏到设备`);
        const { localPath, remoteDevicePath } = data;                       
        try {
            const result = await this.m_adbPushTool.pushToDevice(localPath, remoteDevicePath);
            this.logger.success(`推送游戏成功: ${result}`);            
        } catch (error) {
            this.logger.error(`推送游戏失败: ${error.message}`);
            return;
        }
    }
}


module.exports = adb_push_game;