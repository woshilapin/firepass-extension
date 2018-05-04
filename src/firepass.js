let logins = async () => {
	return await browser.runtime.sendNativeMessage('firepass', {
		"command": 'ls',
		"args": {},
	});
};
let login = async (path) => {
	return await browser.runtime.sendNativeMessage('firepass', {
		"command": 'show',
		"args": {
			path,
		},
	});
};

export default {
	logins,
	login
};
