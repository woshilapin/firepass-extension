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
