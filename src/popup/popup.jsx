import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

let storage = window.localStorage;
let render = (firepass) => {
	let app = <App logins={firepass.logins} />;
	ReactDOM.render(app, document.getElementById('app'));
};
if(storage.getItem('firepass')) {
	render(JSON.parse(storage.getItem('firepass')));
}
window.addEventListener('load', async () => {
	try {
		let logins = await browser.runtime.sendNativeMessage('firepass', {
			"command": 'ls',
			"args": {}
		});
		let firepass = Object.assign({}, JSON.parse(storage.getItem('firepass')), {logins});
		storage.setItem('firepass', JSON.stringify(firepass));
		render(firepass);
	} catch(error) {
		console.error(error);
	}
});
