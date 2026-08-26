import { t as require_jsx_runtime } from "./index-BXMTArcK.js";
//#region src/tools/TextureStatistics.jsx
var import_jsx_runtime = require_jsx_runtime();
function TextureStatistics() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "texture_statistics_body",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stats-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stats-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label",
						children: "总纹理数"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "value",
						children: "110"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toolbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "toolbar-item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label",
						children: "筛选"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "table-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-cell",
								children: "纹理名称"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-cell",
								children: "纹理大小"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-cell",
								children: "纹理格式"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-cell",
								children: "纹理类型"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-cell",
								children: "纹理状态"
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { TextureStatistics as default };
