import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { n as require_react, t as require_jsx_runtime } from "./index-r7aNocDy.js";
import { t as EditorService_default } from "./EditorService-ptYj2fsN.js";
import { t as CocosIpcAdapter_default } from "./CocosIpcAdapter-DfpbYn1L.js";
import { t as require_path } from "./path-Ce5-mKfc.js";
//#region src/css/texture_statistics.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/tools/TextureStatistics.jsx
var import_path = /* @__PURE__ */ __toESM(require_path());
var import_jsx_runtime = require_jsx_runtime();
function TextureStatistics() {
	const [textureList, setTextureList] = (0, import_react.useState)([]);
	const [totalSize, setTotalSize] = (0, import_react.useState)(0);
	const [totalMemorySize, setTotalMemorySize] = (0, import_react.useState)(0);
	const [maxMemorySize, setMaxMemorySize] = (0, import_react.useState)(0);
	const formateSize = (bytes) => {
		if (bytes === 0 || !bytes) return "0 B";
		const k = 1024;
		const sizes = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		const unitIndex = Math.min(i, sizes.length - 1);
		const value = bytes / Math.pow(k, unitIndex);
		return unitIndex === 0 ? `${value} B` : `${value.toFixed(2)} ${sizes[unitIndex]}`;
	};
	const getMemoryBarClass = (memorySize) => {
		if (memorySize < maxMemorySize / 8) return "info";
		if (memorySize < maxMemorySize / 2) return "warning";
		if (memorySize <= maxMemorySize) return "danger";
		return "danger";
	};
	(0, import_react.useEffect)(async () => {
		const res = await EditorService_default.queryAssetsByAssetTypeAsync("cc.Texture2D");
		const textureInfo = await Promise.all(res.map(async (item) => {
			const info = EditorService_default.queryInfoByUuidSync(item.uuid);
			const meta = EditorService_default.queryMetaByUuidSync(item.uuid);
			const [resItem] = await CocosIpcAdapter_default.sendToMainASync("cocos-tools-react:fs-stat", { item });
			item.size = resItem.size;
			const memorySize = meta.width * meta.height * 4;
			return {
				...info,
				...meta,
				...item,
				memorySize
			};
		}));
		let totalSize = 0;
		let totalMemorySize = 0;
		textureInfo.forEach((item) => {
			totalSize += item.size;
			totalMemorySize += item.memorySize;
		});
		setTotalSize(totalSize);
		setTotalMemorySize(totalMemorySize);
		setTextureList(textureInfo);
		const maxMem = Math.max(...textureInfo.map((item) => item.memorySize), 1048576);
		setMaxMemorySize(maxMem);
	}, []);
	const sortedTextureList = () => {
		return [...textureList].sort((a, b) => {
			return b.size - a.size;
		});
	};
	const sortedTextureListByMemory = () => {
		return [...textureList].sort((a, b) => {
			return b.memorySize - a.memorySize;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "texture_statistics_body",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stat-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "纹理总数"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: textureList.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "纹理总大小"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: formateSize(totalSize)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "预估占用内存"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: formateSize(totalMemorySize)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "search-box",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "search-input",
							type: "text",
							placeholder: "搜索纹理名称或路径...",
							onInput: (e) => {
								console.log(e.target.value);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn primary",
						onClick: () => {
							console.log("按尺寸排序");
							setTextureList(sortedTextureList());
						},
						children: "按尺寸排序"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn primary",
						onClick: () => {
							console.log("按内存排序");
							setTextureList(sortedTextureListByMemory());
						},
						children: "按内存排序"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "table-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: "60px" },
								children: "预览"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: "100px" },
								children: "名字"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: "200px" },
								children: "uuid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: "100px" },
								children: "大小"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { minWidth: "180px" },
								children: "内存占用"
							})
						] })
					}), textureList.length > 0 && textureList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "table-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "texture-preview",
								src: item.path
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: import_path.default.basename(item.path) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.uuid }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formateSize(item.size) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "memory-cell",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formateSize(item.memorySize) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "memory-bar-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `memory-bar-fill ${getMemoryBarClass(item.memorySize)}`,
									style: { width: `${Math.min(item.memorySize / maxMemorySize * 100, 100)}%` }
								})
							})]
						}) })
					] }, item.uuid))]
				})
			})
		]
	});
}
//#endregion
export { TextureStatistics as default };
