// 工具注册表：加一个新工具 = 往数组里加一条配置，不改壳代码。
// load 用动态 import，每个工具单独拆包，首屏不加载。

import {
    LayersIcon,
    ImageIcon,
    FilmIcon,
    BracesIcon,
    BoxIcon,
    PackageIcon,
    AdbPhoneIcon,
} from './icons';

export const toolRegistry = [
    {
        id: 'atlasPack',
        title: '图集打包',
        description: '扫描资源，生成图集打包配置文件。',
        icon: LayersIcon,
        group: '资源处理',
        load: () => import('./tools/AtlasPack'),
    },
    {
        id: 'bundle-audit',
        title: 'Bundle 审计',
        description: '分析 Asset Bundle 依赖与体积',
        icon: BoxIcon,
        group: '构建',
        load: () => import('./tools/BundleAudit'),
    },
    {
        id: 'wanbaBuild',
        title: 'WanBa Build',
        description: '构建项目，生成玩吧游戏资源包。',
        icon: PackageIcon,
        group: '构建',
        load: () => import('./tools/WanBaBuild'),
    },
    {
        id: 'adbPush',
        title: 'ADB Push',
        description: '将文件上传到 Android 设备。',
        icon: AdbPhoneIcon,
        group: '构建',
        load: () => import('./tools/AdbPush'),
    },
    {
        id: '资源统计',
        title: '资源统计',
        description: '统计项目资源。',
        icon: ImageIcon,
        group: '资源处理',
        load: () => import('./tools/ResourceStatistics'),
    }
];
