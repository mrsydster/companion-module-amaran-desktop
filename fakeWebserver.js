const fs = require('fs')
const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 33782 })

server.on('connection', (ws) => {
	console.log('Plugin connected')

	// Log incoming messages from the plugin
	ws.on('message', (message) => {
		try {
			// Convert buffer to JSON string
			const jsonString = message.toString('utf-8')
			const json = JSON.parse(jsonString)
			console.log('Received from plugin:', json)

			// add to log file
			fs.appendFile('log.txt', jsonString + '\n', function (err) {
				if (err) throw err
				console.log('Saved!')
			})

			// Example of echoing the message back to the plugin
			ws.send(`Echo: ${jsonString}`)
		} catch (error) {
			console.error('Error parsing message:', error)
		}
	})

	// Log when the plugin disconnects
	ws.on('close', () => {
		console.log('Plugin disconnected')
	})

	// Log errors
	ws.on('error', (error) => {
		console.error('WebSocket error:', error)
	})
})

console.log('Fake WebSocket server is running on ws://127.0.0.1:33782')
