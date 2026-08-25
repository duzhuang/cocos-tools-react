import { memo } from 'react';
import { ChevronRightIcon } from '../icons';

function SidebarItem({ tool, active, onSelect }) {
    const Icon = tool.icon;
    return (
        <button
            className={`nav-item${active ? ' active' : ''}`}
            onClick={() => onSelect(tool.id)}
            aria-current={active ? 'page' : undefined}
        >
            <Icon />
            <span>{tool.title}</span>
        </button>
    );
}

const MemoItem = memo(SidebarItem);

function Group({ group, activeId, onSelect, collapsed, onToggle }) {
    return (
        <div className="group">
            <button
                className={`group__header${collapsed ? ' closed' : ''}`}
                onClick={onToggle}
            >
                <ChevronRightIcon className="chevron" />
                <span>{group.name}</span>
                <span className="group__count">{group.tools.length}</span>
            </button>
            {!collapsed &&
                group.tools.map((t) => (
                    <MemoItem
                        key={t.id}
                        tool={t}
                        active={t.id === activeId}
                        onSelect={onSelect}
                    />
                ))}
        </div>
    );
}

export default function Sidebar({
    groups,
    activeId,
    onSelect,
    searching,
    collapsedGroups,
    onToggleGroup,
}) {
    return (
        <aside className="sidebar" aria-label="工具导航">
            {groups.map((g) => {
                const closed = !searching && collapsedGroups.has(g.name);
                return (
                    <Group
                        key={g.name}
                        group={g}
                        activeId={activeId}
                        onSelect={onSelect}
                        collapsed={closed}
                        onToggle={() => onToggleGroup(g.name)}
                    />
                );
            })}
            {groups.length === 0 && <div className="empty">没有匹配的工具</div>}
        </aside>
    );
}