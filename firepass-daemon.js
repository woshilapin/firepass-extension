#!/usr/bin/env /Users/simardj/.dot/nvm/versions/node/v8.7.0/bin/node
process.stdin.on('data', function(buffer) {
	let messageReceivedString = JSON.parse(buffer.slice(4));
	let messageReceived = JSON.parse(messageReceivedString)
	let messageReceivedLength = buffer.readInt32LE(0);
	let message = Buffer.from(JSON.stringify({
		count: messageReceived.count,
		content: 'pong',
	}), 'utf8');
	let messageLength = Buffer.alloc(4, 0);
	messageLength.writeInt32LE(Buffer.byteLength(message), 0);
	process.stdout.write(messageLength);
	process.stdout.write(message);
});
