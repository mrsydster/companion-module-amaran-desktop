const WebSocket = require('ws')

// WebSocket connection URL
const wsUrl = 'ws://127.0.0.1:33782/ws'

// Create a WebSocket connection
const ws = new WebSocket(wsUrl)

// Function to handle sending messages
function sendMessage(type, node_id, args = {}) {
	const message = JSON.stringify({
		version: 0,
		type: type,
		...(node_id && { node_id }),
		...(args && { args }),
	})
	ws.send(message)
}

// On connection open
ws.on('open', () => {
	console.log('WebSocket connected')

	// Send get actions to retrieve information from the application
	sendMessage('get_device_list')

	setInterval(() => {
		sendMessage('get_node_config', '400I5-DC5451')
	}, 5000)
})

// On receiving a message
ws.on('message', (data) => {
	try {
		// Convert buffer to JSON string and parse it
		const jsonString = data.toString('utf-8')
		const json = JSON.parse(jsonString)

		console.log('Received from application:', json.data)
	} catch (error) {
		console.error('Error parsing message:', error)
	}
})

// On connection close
ws.on('close', () => {
	console.log('WebSocket disconnected')
})

// On error
ws.on('error', (error) => {
	console.error('WebSocket error:', error)
})

// 400H5-F14198
