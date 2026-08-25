export default function ToolHeader({ tool }) {
    const Actions = tool.headerActions;
    return (
        <div className="tool-header">
            <div>
                <h1 className="tool-header__title">{tool.title}</h1>
                {tool.description && (
                    <p className="tool-header__desc">{tool.description}</p>
                )}
            </div>
            {Actions && <div className="tool-header__actions">{<Actions />}</div>}
        </div>
    );
}
