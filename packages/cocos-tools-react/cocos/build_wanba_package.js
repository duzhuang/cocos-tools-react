const { exec, spawn } = require('child_process');
const { logger } = require('./cocos_editor_adapter');
const common_utils = require('./common_utils');



/**
 * 构建玩吧资源包工具
 * 1、使用 CommonJS 模块规范
 * 2、提供构建玩吧资源包的函数
 */
class build_wanba_package {

    /**
     * 构建玩吧资源包
     * @param {string} platform - 平台，"ios" 
     * @param {boolean} debug - 是否调试模式
     * @returns {Promise<string>} - 构建输出
     */
    async build(platform = 'ios', debug = true) {
        const projectPath = Editor.Project.path;
        if (!projectPath) throw new Error('项目路径不能为空');

        logger.log(`开始构建: 项目=${projectPath}, 平台=${platform}, debug=${debug}`);
        try {
            const output = await this._runBuild(projectPath, platform, debug);
            logger.log('构建完成');
            this._copySettingFile();
            return output;
        } catch (err) {
            logger.error(`构建失败: ${err.message}`);
            throw err;
        }
    }

    /**
     * 运行构建命令
     * @param {string} projectPath - 项目路径
     * @param {string} platform - 平台
     * @param {boolean} debug - 是否调试模式
     * @returns {Promise<string>} - 构建输出
     */
    _runBuild(projectPath, platform, debug) {
        return new Promise((resolve, reject) => {
            const args = [
                '--path', projectPath,
                '--build', `platform=${platform};debug=${debug};template=default;nativeMd5Cache=false;encryptJs=false`
            ];

            // cocos 引擎的路径
            const editorPath = this._getEditorPath();
            const child = spawn(editorPath, args, { timeout: 600000 });

            let stdout = '', stderr = '';
            child.stdout.on('data', data => { stdout += data; });            

            child.stderr.on('data', data => { stderr += data; });

            child.on('error', err => reject(new Error(`启动失败: ${err.message}`)));
            child.on('close', code => {
                if (code === 0) resolve(stdout);
                else reject(new Error(`退出码 ${code}\n${stderr}`));
            });
        });
    }

    /**
     * 获取creator的具体路径
     * @returns {string}
     */
    _getEditorPath() {
        return Editor.App.path.slice(0, Editor.App.path.indexOf("Resources/app.asar")) + "/MacOS/CocosCreator";
    }


    /**
     * 复制setting文件到assets目录
     */
    _copySettingFile() {
        const defaultPath = Editor.Project.path + "/build" + "/jsb-default";
        let srcPath = defaultPath + "/src/settings.js";
        let assetsPath = defaultPath + "/assets/settings.js";
        common_utils.copyFileStream(srcPath, assetsPath);
    }
}

module.exports = build_wanba_package;

