import messages from '../index'

// ------------------------------------
//
// ------------------------------------

// test('a single level event', () => {
//   let result
//   events.on('letters', (msg) => result = msg)
//   events.emit('letters', 'it worked!')
//   expect(result).toBe('it worked!')
// })
//
// test('a double level event', () => {
//   let result
//   events.on('**.fired', (msg) => result = msg)
//   events.emit('letters.fired', 'it worked!')
//   expect(result).toBe('it worked!')
// })
//
// test('a very deeply stacked namespace wildcard', () => {
//   let result
//   events.on('**.fired', (msg) => result = msg)
//   events.emit('network.letters.3.fired', 'it worked!')
//   expect(result).toBe('it worked!')
// })
//
// test('a very deeply stacked namespace wildcard plus an additional last layer', () => {
//   events.on('**.fired', (msg) => result = msg)
//   events.emit('network.letters.3.fired.connect', 'it worked!')
//   expect(result).toBe(undefined)
// })

test('all events from a specific modality', () => {
  let receivedCount = 0
  messages.on('letters:**', (msg, channels) => receivedCount++)
  // should hear
  messages.send('letters', 'it worked!') // 1
  messages.send('letters:1', 'it worked!') // 2
  messages.send('letters:3:fired', 'it worked!') // 3
  messages.send('letters:9:expected', 'it worked!') // 4
  // should not
  messages.send('words', 'it worked!')
  messages.send('words:9', 'it worked!')
  messages.send('words:9:expected', 'it worked!')
  messages.send('words:letters', 'it worked!')
  expect(receivedCount).toBe(4)
})

test('all fire events', () => {
  let result
  messages.on('**:fired', (msg, channels) => result = msg)
  messages.send('network:letters:3:fired', 'neuron fired')
  expect(result).toBe('neuron fired')
})

test('only fire events from a specific modality and layer', () => {
  let result
  messages.on('network:**:fired', (msg, channels) => result = msg)
  messages.send('network:letters:3:fired', 'neuron fired')
  expect(result).toBe('neuron fired')
})

test('all fire events from a specific layer regardless of modality', () => {
  let receivedCount = 0
  messages.on('**:3:fired', (msg, channels) => receivedCount++)
  messages.on('**:2:fired', (msg, channels) => receivedCount++)
  messages.send('network:letters:3:fired', 'neuron fired')
  expect(receivedCount).toBe(1)
})
