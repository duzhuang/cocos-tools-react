import { SearchIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from '../icons.jsx';


function Header({ query, onQuery, collapsed, onToggle }) {
    return (
        <header className="header">
            <div className="header__brand">
                <span className="dot" />
                Cocos Toolbox
            </div>

            <div className="search">
                <SearchIcon />
                <input
                    value={query}
                    onChange={(e) => onQuery(e.target.value)}
                    placeholder="搜索工具…"
                    spellCheck={false}
                />
            </div>

            <button
                className="icon-btn"
                onClick={onToggle}
                title={collapsed ? '展开侧栏' : '折叠侧栏'}
                aria-label={collapsed ? '展开侧栏' : '折叠侧栏'}
            >
                {collapsed ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
            </button>

        </header>
    );
}

export default Header;