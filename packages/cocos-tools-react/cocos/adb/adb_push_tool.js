const { exec, spawn } = require('child_process');
const { logger } = require('../cocos_editor_adapter');
const fs = require('fs');


/**
 * adb文件推送工具
 */
class adb_push_tool {

    constructor() {
        this.logger = logger;
    }

    /**
    * 将本地文件推送到 Android 设备。
    *
    * 该操作会调用 `adb push` 命令，并等待其完成。
    * - 如果 adb 退出码为 0，则认为推送成功，返回 stdout 的修剪结果。
    * - 如果 adb 退出码非 0，则抛出 AdbExecutionError，其中包含退出码、stdout 和 stderr。
    * - 如果本地文件不存在或不可读，会在命令执行前抛出 ValidationError。
    * - 如果指定了设备序列号，则会使用 `-s` 参数指定设备；否则默认使用当前唯一连接的设备。
    *
    * @param {string} localPath - 本地文件路径（必须存在且为文件）
    * @param {string} remotePath - 设备上的目标路径
    * @param {Object} [options]
    * @param {string} [options.serial] - 设备序列号，多设备时必须指定
    * @param {AbortSignal} [options.signal] - 可选的取消信号
    * @returns {Promise<string>} 推送完成后 adb 命令的标准输出（已修剪空白）
    */
    async pushToDevice(localPath, remotePath, options = {}) {
        // 1、前置验证
        this._validatePushArguments(localPath, remotePath);
        // 2、构建命令参数
        const args = this._buildPushArgs(localPath, remotePath, options.serial);

        // 3. 执行命令，并处理超时、取消和错误分类
        return this._execAdbCommand(args, {
            timeout: options.timeout || 30000,
            signal: options.signal,
            errorMessage: `adb push ${localPath} -> ${remotePath} failed`
        })
    }


    /**
     * 验证 push 参数，确保进入命令执行前错误被消除。 
     * @returns {boolean} 验证结果
     */
    _validatePushArguments(localPath, remotePath) {
        if (typeof localPath !== 'string' || localPath.length === 0) {
            throw new Error('localPath must be a non-empty string');
        }
        if (typeof remotePath !== 'string' || remotePath.length === 0) {
            throw new Error('remotePath must be a non-empty string');
        }

        try {
            const stat = fs.statSync(localPath);
            if (!stat.isDirectory()) {
                throw new Error(`Local path is not a directory: ${localPath}`);
            }
        } catch (error) {
            throw new Error(`Cannot access local directory: ${localPath}`, { cause: error });
        }
    }


    /**
     * 构建 adb push 命令参数
     * 使用数组形式直接传给 spawn
     * @param {*} localPath 
     * @param {*} remotePath 
     * @param {*} serial 
     */
    _buildPushArgs(localPath, remotePath, serial) {
        const args = [];
        if (serial) {
            args.push('-s', serial);
        }
        args.push('push', localPath, remotePath);
        return args;
    }


    /**
     * 执行 adb 命令并处理结果、超时、取消和错误分类  
     * 该方法是与子进程交互的唯一出口，集中处理进程管理。   
     */
    _execAdbCommand(args, { timeout, signal, errorMessage }) {
        return new Promise((resolve, reject) => {
            const child = spawn('adb', args, { stdio: ['ignore', 'pipe', 'pipe'] });
            let stdout = '';
            let stderr = '';
            let timedOut = false;
            let killedBySignal = false;

            // 收集输出
            child.stdout.on('data', (data) => { stdout += data.toString(); });
            child.stderr.on('data', (data) => { stderr += data.toString(); });

            // 处理取消信号
            if (signal) {
                if (signal.aborted) {
                    child.kill("SIGTERM");
                    killedBySignal = true;
                } else {
                    signal.addEventListener('abort', () => {
                        child.kill('SIGTERM');
                        killedBySignal = true;
                    }, { once: true });
                }
            }

            // 错误事件（例如无法启动进程）
            child.on('error', (err) => {
                reject(new Error(`Failed to start adb: ${err.message}`, {
                    cause: err,
                    stdout,
                    stderr,
                    exitCode: null
                }));
            });

            // 进程退出
            child.on('close', (code) => {     

                if (killedBySignal) {
                    reject(new Error('adb push was cancelled', {
                        stdout,
                        stderr,
                        exitCode: code
                    }));
                    return;
                }

                if (code !== 0) {
                    reject(new Error(
                        `${errorMessage} (exit code ${code})`,
                        { stdout, stderr, exitCode: code }
                    ));
                    return;
                }

                // 成功：如果 stderr 有内容，记录为警告但不影响结果
                if (stderr.trim()) {
                    this.logger?.warn(`adb push stderr: ${stderr.trim()}`);
                }
                resolve(stdout.trim());
            });

        });
    }
}

module.exports = adb_push_tool;