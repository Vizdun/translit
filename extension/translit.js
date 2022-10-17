browser.menus.create({
	title: "translit",
	documentUrlPatterns: ["*://*/*"],
	contexts: [
		"page"
	],
	onclick(info, tab) {
		browser.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			code: `
			(async function() {
				const rusty = await import("${browser.runtime.getURL("/pkg/translit_wasm.js")}");

				const wasm = await rusty.default();

				const element = browser.menus.getTargetElement(${info.targetElementId})
			
				element.innerHTML = rusty.translit(element.innerHTML);
			})();
      `,
		})
	},
})

browser.menus.create({
	title: "translit",
	documentUrlPatterns: ["*://*/*"],
	contexts: [
		"tab"
	],
	onclick(info, tab) {
		browser.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			code: `
			(async function() {
				const rusty = await import("${browser.runtime.getURL("/pkg/translit_wasm.js")}");

				const wasm = await rusty.default();

				const element = document.body
			
				element.innerHTML = rusty.translit(element.innerHTML);
			})();
      `,
		})
	},
})
