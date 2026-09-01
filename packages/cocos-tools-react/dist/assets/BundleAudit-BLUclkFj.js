import { t as require_jsx_runtime } from "./index-JaBF8xtF.js";
//#region src/tools/BundleAudit.jsx
var import_jsx_runtime = require_jsx_runtime();
function BundleAudit() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bundle 审计" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "分析 Asset Bundle 依赖与体积的实现放这里。" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn primary",
				children: "开始分析"
			})
		]
	});
}
//#endregion
export { BundleAudit as default };
