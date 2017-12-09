browser.browserAction.onClicked.addListener(async () => {
	let args = ['perso/web/test'];
	try {
		let response = await browser.runtime.sendNativeMessage('firepass', args);
		console.log(response);
	} catch(error) {
		console.error(error);
	}
});
