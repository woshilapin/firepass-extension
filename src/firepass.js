browser.browserAction.onClicked.addListener(async () => {
	let command = 'ls';
	let args = {
		"path": 'perso/web/test'
	};
	try {
		let response = await browser.runtime.sendNativeMessage('firepass', {command, args});
		console.log('Background');
		console.log(response);
		browser.tabs.sendMessage(response);
	} catch(error) {
		console.error(error);
	}
});
browser.runtime.onMessage.addListener((command) => {
	console.log('[background] Received a command');
	console.log(command);
});
