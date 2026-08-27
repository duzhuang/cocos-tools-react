import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { n as require_react, t as require_jsx_runtime } from "./index-B7OSM0H9.js";
import { t as EditorService_default } from "./EditorService-ptYj2fsN.js";
import { t as require_path } from "./path-Ce5-mKfc.js";
//#region src/tools/ResourceStatistics.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_path = /* @__PURE__ */ __toESM(require_path());
var import_jsx_runtime = require_jsx_runtime();
function ResourceStatistics() {
	const [assetTypes, setAssetTypes] = (0, import_react.useState)([]);
	const [isMenuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [selectedType, setSelectedType] = (0, import_react.useState)(null);
	const [selectedRes, setSelectedRes] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setAssetTypes(EditorService_default.allAssetTypes());
	}, []);
	const onQueryAssets = (0, import_react.useCallback)(async () => {
		if (!selectedType) return;
		try {
			const resList = await EditorService_default.queryAssetsByAssetTypeAsync(selectedType);
			console.log("查询资源成功:", resList);
			const detailList = await Promise.all(resList.map(async (item) => {
				const name = import_path.default.basename(item.path);
				const detail = EditorService_default.queryInfoByUuidAsync(item.uuid);
				console.log("查询资源详细信息成功:", detail);
				return {
					...item,
					name,
					detail
				};
			}));
			setSelectedRes(detailList);
		} catch (error) {
			console.error("查询资源失败:", error);
			setSelectedRes([]);
		}
	}, [selectedType]);
	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const onSelectType = (type) => {
		setSelectedType(type);
		setMenuOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "field__label",
						children: "资源类型"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "field__value",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `select ${isMenuOpen ? "is-open" : ""}`,
							id: "selectAssetType",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "select__trigger",
								tabIndex: 0,
								role: "combobox",
								"aria-haspopup": "listbox",
								"aria-expanded": isMenuOpen,
								"aria-controls": "selectAssetType-menu",
								onClick: toggleMenu,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "select__placeholder",
									children: selectedType || "选择资源类型"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "select__arrow",
									viewBox: "0 0 12 12",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 4.5L6 7.5L9 4.5" })
								})]
							}), isMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "select__menu",
								id: "selectAssetType-menu",
								role: "listbox",
								children: assetTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "select__option",
									role: "option",
									"data-value": type,
									onClick: () => onSelectType(type),
									children: type
								}, type))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "field__value right-align",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn primary",
							onClick: onQueryAssets,
							children: "查询资源统计"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "field",
				children: selectedRes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "field__value",
					children: selectedRes.map((res) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field__value",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["名称：", res.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["UUID：", res.uuid] })]
					}, res.uuid))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "资源数量"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "field__value",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: "resourceCount",
						children: selectedRes.length || 0
					})
				})]
			})
		]
	});
}
//#endregion
export { ResourceStatistics as default };
