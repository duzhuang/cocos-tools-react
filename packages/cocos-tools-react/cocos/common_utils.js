const fs = require('fs');
const path = require('path');

const utils = {

    /**
     * 输出当前环境 node 版本
     */
    outputNodeVersion() {
        Editor.log("当前环境 node 版本:", process.versions.node);
    },

    

    /**
     * 拷贝文件流（自动创建父目录）
     * @param {string} src 源路径
     * @param {string} dest 目标路径
     */
    async copyFileStream(src, dest) {
        await fs.promises.mkdir(path.dirname(dest), { recursive: true });
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);
        await pipeline(readStream, writeStream);
    },

    /**
     * 检查指定路径文件是否存在（绝对路径）
     * @param {string} filePath - 文件路径（绝对路径）
     * @returns {boolean} - 是否存在
     */
    checkFileExist(filePath) {
        return fs.existsSync(filePath);
    },

    /**
     * 读取指定路径文件内容（绝对路径）
     * @param {string} filePath - 文件路径（绝对路径）
     * @returns {JSON} - 文件内容
     * @throws {Error} - 读取文件失败时抛出错误
     */
    readJsonFile(filePath) {        
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    },

    /**
     * 检查当前对象是否是空对象
     * @param {object} obj - 要检查的对象
     * @returns {boolean} - 是否是空对象
     */
    isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    },


    /**
     * 查找当前项目中的所有预制体资源
     * @returns {Promise<Array>} 返回预制体资源结果数组
     */
    queryPrefabsAssetsAsync() {
        return new Promise((resolve, reject) => {
            Editor.assetdb.queryAssets('db://assets/**\/*', 'prefab', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    /**
     * 查找当前项目中的所有场景资源
     * @returns {Promise<Array>} 返回场景资源结果数组
     */
    queryScenesAssetsAsync() {
        return new Promise((resolve, reject) => {
            Editor.assetdb.queryAssets('db://assets/**\/*', 'scene', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    /**
     * 查找当前项目中的所有资源
     * @param {string|string[]} assetTypes - 资源类型，可以是单个类型字符串或类型数组
     * @returns {Promise<Array>} 返回资源结果数组
     */
    queryAssetsByAssetTypesAsync(assetTypes) {
        return new Promise((resolve, reject) => {
            Editor.assetdb.queryAssets('db://assets/**\/*', assetTypes, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
}

module.exports = utils;