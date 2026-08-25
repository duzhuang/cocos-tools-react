/**
 * Cocos IPC 适配器
 * 封装 Editor.Ipc 的通信能力，提供 Promise 化的 sendToMain
 */
class CocosIpcAdapter {

    constructor(editor = Editor) {
        this.m_editor = editor;
    }

    /**
     * 发送消息到主进程（原样透传）
     * @param {string} message - IPC 消息名称
     * @param {...any} args - 参数，包括回调函数和超时（可选）
     * @returns {any} - 原方法返回值（通常为 undefined）
     */
    sendToMain(message, ...args) {
        if (!this.m_editor || !this.m_editor.Ipc) {
            throw new Error('[CocosIpcAdapter] Editor.Ipc is not available.');
        }        
        return this.m_editor.Ipc.sendToMain(message, ...args);
    }

}

export default new CocosIpcAdapter();
