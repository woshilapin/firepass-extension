import firepass from './firepass.js';

self.postMessage({"data": "FooBar"});

self.addEventListener('message', (event) => {
	console.log('logins-worker started');
	firepass.logins().then((logins) => self.postMessage(logins));
});
