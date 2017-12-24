import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello.jsx';

let command = 'ls';
let args = {
	"path": 'perso/web/test'
};
window.addEventListener('load', async () => {
	let response = await browser.runtime.sendNativeMessage('firepass', {command, args})
	browser.runtime.sendMessage(response);
	let list = document.getElementById('list');
	list.textContent = JSON.stringify(response);
});

ReactDOM.render(<Hello name="Jean" />, document.getElementById('app'));
