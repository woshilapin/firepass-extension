import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

let storage = window.localStorage;
let getLogins = async () => {
	return await browser.runtime.sendNativeMessage('firepass', {
		"command": 'ls',
		"args": {},
	});
};
let getMetadata = async (path) => {
	return await browser.runtime.sendNativeMessage('firepass', {
		"command": 'show',
		"args": {
			path,
		},
	});
};
let getAllMetadata = async (logins, path) => {
	for(let file of logins) {
		if(file.type === 'folder') {
			await getAllMetadata(file.files, `${path}/${file.name}`);
		} else if(file.type === 'file' && file.metadata === undefined) {
			let metadata = await getMetadata(`${path}/${file.name}`);
			file.metadata = metadata;
		}
	}
}
let render = (firepass) => {
	let app = <App logins={firepass.logins} />;
	ReactDOM.render(app, document.getElementById('app'));
};
if(storage.getItem('firepass')) {
	render(JSON.parse(storage.getItem('firepass')));
}
window.addEventListener('load', async () => {
	try {
		let logins = await getLogins();
		let firepass = Object.assign({}, JSON.parse(storage.getItem('firepass')), {logins});
		render(firepass);
		await getAllMetadata(logins, '');
		storage.setItem('firepass', JSON.stringify(firepass));
	} catch(error) {
		console.error(error);
	}
});
