const fs = require('fs');
const path = require('path');
const { zlib } = require('zlib'); 

// 1. 创建输出目录
const outputDir = path.join(__dirname, '../releases');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
const zipPath = path.join(outputDir, 'cocos-tools-release.zip');

console.log('🚀 开始动态构建纯净的 package.json...');

// 2. 读取并动态裁剪 package.json
const pkg = require('../package.json');
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.dependencies;
delete pkg.directories;
delete pkg.license;
delete pkg.keywords;

// 3. 🚀 使用 Node.js 的原生 child_process 执行系统压缩（Mac/Linux 环境完美支持）
const { execSync } = require('child_process');

try {
    // 临时创建一个用于打包的发布目录，避免污染开发源码
    const tempDist = path.join(outputDir, 'temp_package');
    if (fs.existsSync(tempDist)) fs.rmSync(tempDist, { recursive: true, force: true });
    fs.mkdirSync(tempDist, { recursive: true });

    // 复制编译后的 dist 到临时发布目录
    const sourceDist = path.join(__dirname, '../dist');
    if (fs.existsSync(sourceDist)) {
        fs.cpSync(sourceDist, path.join(tempDist, 'dist'), { recursive: true });
    }
    // 如果有主进程 cocos 目录，也拷过去
    const sourceCocos = path.join(__dirname, '../cocos');
    if (fs.existsSync(sourceCocos)) {
        fs.cpSync(sourceCocos, path.join(tempDist, 'cocos'), { recursive: true });
    }

    // 将裁剪好的 package.json 写入临时发布目录
    fs.writeFileSync(path.join(tempDist, 'package.json'), JSON.stringify(pkg, null, 4));

    // 调用系统原生 zip 命令进行极致压缩
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath); // 清理旧压缩包
    
    // 进入临时目录把里面的内容打包
    execSync(`zip -r "${zipPath}" ./*`, { cwd: tempDist });

    // 清理临时目录
    fs.rmSync(tempDist, { recursive: true, force: true });

    console.log(`\n🎉 插件发布包自动裁剪并打包成功！`);
    console.log(`📦 最终发布包路径: ${zipPath}`);

} catch (error) {
    console.error('❌ 打包失败，错误原因：', error.message);
}
