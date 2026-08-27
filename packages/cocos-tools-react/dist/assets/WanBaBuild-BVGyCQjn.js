import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { n as require_react, t as require_jsx_runtime } from "./index-Bt4-H01s.js";
import { t as EditorService_default } from "./EditorService-ptYj2fsN.js";
import { t as CocosIpcAdapter_default } from "./CocosIpcAdapter-DfpbYn1L.js";
//#region src/tools/WanBaBuild.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WanBaBuild() {
	const [debug, setDebug] = (0, import_react.useState)(false);
	const onBuild = (0, import_react.useCallback)(() => {
		CocosIpcAdapter_default.sendToMain("cocos-tools-react:wanBaBuild", {
			platform: "ios",
			debug
		});
	}, [debug]);
	(0, import_react.useEffect)(() => {
		console.log("构建资源包工具挂载");
		return () => {
			console.log("构建资源包工具卸载");
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "构建资源包" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "游戏名称"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__value",
					children: EditorService_default.projectInfo?.name || "WanBa Game"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "构建目录"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__value mono",
					children: EditorService_default.projectInfo?.path || "build"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "Platform"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__value",
					children: "IOS"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "Debug"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: debug,
					onChange: (e) => setDebug(e.target.checked)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn primary",
					onClick: onBuild,
					children: "构建"
				})
			})
		]
	});
}
//#endregion
export { WanBaBuild as default };
