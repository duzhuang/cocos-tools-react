import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',   
    build: {
        // ✨ watch 必须写在 build 里面
        watch: {
            // 这里可以留空对象，代表使用默认的监听配置
        },
        // 建议在开发阶段关闭压缩，能大幅加快每次保存代码后的热打包速度
        minify: false, 
    }
});
