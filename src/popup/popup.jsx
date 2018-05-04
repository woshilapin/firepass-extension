import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import firepass from '../firepass.js';
import LoginsWorker from '../logins-worker.js';


let FIREPASS_LOGINS_KEY = 'fp:login';
let storage = window.localStorage;
window.addEventListener('load', async () => {
	let logins = await getLogins();
	render(logins);
});
let getLogins = async () => {
	let logins = storage.getItem(FIREPASS_LOGINS_KEY);
	if (logins) {
		return JSON.parse(logins);
	} else {
		return await firepass.logins();
	}
}
let render = (logins) => {
	let app = <App logins={logins} />;
	ReactDOM.render(app, document.getElementById('app'));
}

let loginsWorker = new LoginsWorker();
console.log('Before');
console.log(loginsWorker);
loginsWorker.postMessage({});
console.log('After');
loginsWorker.onmessage = (event) => {
	console.log('received logins');
	console.log(event);
}
