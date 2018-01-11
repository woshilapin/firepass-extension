import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

let command = 'ls';
let args = {
	"path": 'perso/web/test'
};
window.addEventListener('load', async () => {
	try {
		let logins = await browser.runtime.sendNativeMessage('firepass', {command, args})
		let app = <App logins={logins} />;
		ReactDOM.render(app, document.getElementById('app'));
	} catch(error) {
		console.error(error);
	}
});
