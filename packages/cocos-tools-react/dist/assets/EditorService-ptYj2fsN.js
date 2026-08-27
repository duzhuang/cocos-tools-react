//#region src/infrastructure/services/EditorService.js
/**
* 提供编辑器相关服务
* 
*/
var EditorService = class {
	constructor(getEditor = () => window?.Editor) {
		this._getEditor = getEditor;
	}
	getProjectInfo() {
		const editor = this._getEditor();
		if (editor && editor.remote && editor.remote.Project) return editor.remote.Project;
		console.warn("[EditorService] Project info not ready.");
		return null;
	}
	get projectInfo() {
		return this.getProjectInfo();
	}
	/**
	* 获取所有资源类型
	* @returns {string[]} 所有资源类型的数组，每个元素为一个字符串 。cc.SpriteFrame
	*/
	allAssetTypes() {
		const remote = this._getEditor().remote;
		if (!remote) {
			console.warn("[EditorService] remote not ready.");
			return [];
		}
		return Object.keys(remote.assettype2name);
	}
	async queryAssetsByAssetTypeAsync(assetType) {
		const editor = this._getEditor();
		if (!editor) {
			console.warn("[EditorService] editor not ready.");
			return;
		}
		const remote = editor.remote;
		if (!remote) {
			console.warn("[EditorService] remote not ready.");
			return;
		}
		const assetdb = remote.assetdb;
		if (!assetdb) {
			console.warn("[EditorService] assetdb not ready.");
			return;
		}
		const resourceType = remote.assettype2name[assetType];
		if (!resourceType) {
			console.warn("[EditorService] assetType is not a valid resource type.");
			return;
		}
		return new Promise((resolve, reject) => {
			assetdb.queryAssets("db://assets/**/*", resourceType, function(err, results) {
				if (err) reject(err);
				else resolve(results);
			});
		});
	}
	_validateAssetdb() {
		const editor = this._getEditor();
		if (!editor) {
			console.warn("[EditorService] editor not ready.");
			return;
		}
		const remote = editor.remote;
		if (!remote) {
			console.warn("[EditorService] remote not ready.");
			return;
		}
		const assetdb = remote.assetdb;
		if (!assetdb) {
			console.warn("[EditorService] assetdb not ready.");
			return;
		} else return assetdb;
	}
	/**
	* 查询资源详细信息
	* @param {string} uuid - 资源的唯一标识符 
	*/
	queryInfoByUuidSync(uuid) {
		const assetdb = this._validateAssetdb();
		if (!assetdb) return;
		if (!uuid) {
			console.warn("[EditorService] uuid is required.");
			return;
		}
		return assetdb.assetInfoByUuid(uuid);
	}
	/**
	* 查询资源元数据
	* @param {string} uuid - 资源的唯一标识符 
	*/
	queryMetaByUuidSync(uuid) {
		const assetdb = this._validateAssetdb();
		if (!assetdb) return;
		if (!uuid) {
			console.warn("[EditorService] uuid is required.");
			return;
		}
		return assetdb.loadMetaByUuid(uuid);
	}
};
var EditorService_default = new EditorService(() => window?.Editor);
//#endregion
export { EditorService_default as t };
