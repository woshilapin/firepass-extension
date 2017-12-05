let counter = 0;
browser.browserAction.onClicked.addListener(() => {
	let message = {
		count: counter,
		content: 'ping'
	};
	console.log('SENDING');
	console.log(message);
	counter++;
	browser.runtime.sendNativeMessage('firepassd', JSON.stringify(message)).then((response) => {
		console.log('RECEIVED');
		console.log(response);
	}, (error) => {
		console.error('Error: ' + error);
	})
});
