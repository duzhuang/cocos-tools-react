/**
 * 提供编辑器相关服务
 * 
 */
class EditorService {
    constructor(getEditor = () => window?.Editor) {
        this._getEditor = getEditor;
    }

    getProjectInfo() {
        const editor = this._getEditor();
        // ✅ 逐层判空，确保每一级都存在
        if (editor && editor.remote && editor.remote.Project) {
            return editor.remote.Project;
        }
        console.warn('[EditorService] Project info not ready.');
        return null;
    }

    get projectInfo() {
        return this.getProjectInfo();
    }
}

// 导出单例：传入惰性获取方法
export default new EditorService(() => window?.Editor);