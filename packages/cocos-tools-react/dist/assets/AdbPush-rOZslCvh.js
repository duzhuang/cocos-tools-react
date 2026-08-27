import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { n as require_react, t as require_jsx_runtime } from "./index-BRJCVrix.js";
import { t as EditorService_default } from "./EditorService-ptYj2fsN.js";
import { t as CocosIpcAdapter_default } from "./CocosIpcAdapter-BmqNCe2O.js";
//#region src/tools/AdbPush.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdbPush() {
	const [remoteDevicePath, setRemoveDevicePath] = (0, import_react.useState)(() => {
		return "/sdcard/Android/data/com.wodi.who/files/Wanba/download/cocos/cocosNative/" + EditorService_default.projectInfo?.name || "";
	});
	const [localPath, setLocalPath] = (0, import_react.useState)(() => {
		return EditorService_default.projectInfo?.path + "/build/jsb-default/assets" || "";
	});
	const onPush = (0, import_react.useCallback)(() => {
		CocosIpcAdapter_default.sendToMain("cocos-tools-react:pushGameToDevice", {
			localPath,
			remoteDevicePath
		});
	}, [localPath, remoteDevicePath]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "ADB Push" }),
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
					children: "游戏资源包路径"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__value mono",
					children: localPath
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__label",
					children: "设备目标路径"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__value mono",
					children: remoteDevicePath
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn primary",
					onClick: onPush,
					children: "推送"
				})
			})
		]
	});
}
//#endregion
export { AdbPush as default };
