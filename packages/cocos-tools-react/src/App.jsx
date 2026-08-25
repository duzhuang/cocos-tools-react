import { lazy, useMemo, useState, useCallback, Suspense } from 'react';
import Header from './components/Header.jsx';
import { StatusBar, ErrorBoundary, Skeleton } from './components/primitives.jsx';
import Sidebar from './components/Sidebar.jsx';
import ToolHeader from './components/ToolHeader.jsx';
import { toolRegistry } from './toolRegistry.jsx';



const LS = {
    active: 'cocos-toolbox.active',
    collapsed: 'cocos-toolbox.collapsed',
    groups: 'cocos-toolbox.collapsedGroups',
};


/**
 * 写入 localStorage，忽略失败（如隐私模式）
 * @param {string} key 键名
 * @param {string} value 值
 */
function writeLS(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        /* 忽略写入失败（如隐私模式） */
    }
}

/**
 * 读取 localStorage，忽略失败（如隐私模式）
 * @param {string} key 键名
 * @param {string} fallback 默认值
 * @returns {string} 值
 */
function readLS(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : v;
    } catch {
        return fallback;
    }
}


export default function App() {

    const [activeId, setActiveId] = useState(() =>
        readLS(LS.active, toolRegistry[0]?.id ?? '')
    );

    const [collapsed, setCollapsed] = useState(() => readLS(LS.collapsed, '0') === '1');
    const [query, setQuery] = useState('');

    const [collapsedGroups, setCollapsedGroups] = useState(() => {
        const raw = readLS(LS.groups, '');
        return new Set(raw ? raw.split(',') : []);
    });


    const active = toolRegistry.find((t) => t.id === activeId) ?? toolRegistry[0];
    const ActiveComp = useMemo(() => (active ? lazy(active.load) : null), [active]);

    const searching = query.trim().length > 0;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return toolRegistry;
        return toolRegistry.filter(
            (t) =>
                t.title.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                t.group.toLowerCase().includes(q)
        );
    }, [query]);

    const groups = useMemo(() => {
        const out = [];
        for (const t of filtered) {
            let g = out.find((x) => x.name === t.group);
            if (!g) {
                g = { name: t.group, tools: [] };
                out.push(g);
            }
            g.tools.push(t);
        }
        return out;
    }, [filtered]);

    const select = useCallback((id) => {
        setActiveId(id);
        writeLS(LS.active, id);
    }, []);

    const toggleCollapse = useCallback(() => {
        setCollapsed((c) => {
            writeLS(LS.collapsed, c ? '0' : '1');
            return !c;
        });
    }, []);

    const toggleGroup = useCallback((name) => {
        setCollapsedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            writeLS(LS.groups, [...next].join(','));
            return next;
        });
    }, []);

    return (
        <div className="app">
            <Header
                query={query}
                onQuery={setQuery}
                collapsed={collapsed}
                onToggle={toggleCollapse}
            />

            <div className={`app-body${collapsed ? ' collapsed' : ''}`}>
                <Sidebar
                    groups={groups}
                    activeId={activeId}
                    onSelect={select}
                    searching={searching}
                    collapsedGroups={collapsedGroups}
                    onToggleGroup={toggleGroup}
                />

                <main className="content">
                    {active && (
                        <>
                            <ToolHeader tool={active} />
                            <div className="tool-body">
                                <ErrorBoundary key={active.id}>
                                    <Suspense fallback={<Skeleton />}>
                                        {ActiveComp ? <ActiveComp /> : null}
                                    </Suspense>
                                </ErrorBoundary>
                            </div>
                        </>
                    )}
                </main>

            </div>

            <StatusBar />
        </div>
    );
}