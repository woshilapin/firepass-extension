#!/usr/bin/env /Users/simardj/.dot/nvm/versions/node/v8.7.0/bin/node
function read(buffer) {
	let string = JSON.parse(buffer);
	let message = JSON.parse(string)
	return message;
}
function send(message) {
	let messageToSend = Buffer.from(JSON.stringify(message), 'utf8');
	let messageLength = Buffer.alloc(4, 0);
	messageLength.writeInt32LE(Buffer.byteLength(messageToSend), 0);
	process.stdout.write(messageLength);
	process.stdout.write(messageToSend);
}
process.stdin.on('data', function(buffer) {
	let messageReceivedLength = buffer.readInt32LE(0);
	// TODO: Check that the size of the buffer is the size of the content that has to be read (if incomplete, JSON.parse will fail)
	let messageReceived = read(buffer.slice(4));
	let message = {
		count: messageReceived.count,
		content: 'pong',
	};
	send(message)
});
