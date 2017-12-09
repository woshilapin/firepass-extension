browser.browserAction.onClicked.addListener(async () => {
	let command = 'show';
	let args = ['perso/web/test'];
	try {
		let response = await browser.runtime.sendNativeMessage('firepass', {command, args});
		console.log(response);
	} catch(error) {
		console.error(error);
	}
});
