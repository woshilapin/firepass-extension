import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

let command = 'ls';
let args = {
	"path": 'perso/web/test'
};
window.addEventListener('load', async () => {
	let keys = await browser.runtime.sendNativeMessage('firepass', {command, args})
	let app = React.createElement(App, {keys});
	ReactDOM.render(app, document.getElementById('app'));
});

