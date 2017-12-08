let counter = 0;
browser.browserAction.onClicked.addListener(async () => {
	let message = {
		count: counter,
		content: 'ping'
	};
	console.log('SENDING');
	console.log(message);
	counter++;
	try {
		let response = await browser.runtime.sendNativeMessage('firepass', message);
		console.log('RECEIVED');
		console.log(response);
	} catch(error) {
		console.error('Error: ' + error);
	}
});
