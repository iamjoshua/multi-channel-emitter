//import events from '../index'

var EventEmitter2 = require('eventemitter2').EventEmitter2;
var events = new EventEmitter2({

  //
  // set this to `true` to use wildcards. It defaults to `false`.
  //
  wildcard: true,

  //
  // the delimiter used to segment namespaces, defaults to `.`.
  //
  delimiter: '.',

  //
  // set this to `true` if you want to emit the newListener event. The default value is `true`.
  //
  newListener: false,

  //
  // the maximum amount of listeners that can be assigned to an event, default 10.
  //
  maxListeners: 10,

  //
  // show event name in memory leak message when more than maximum amount of listeners is assigned, default false
  //
  verboseMemoryLeak: false
})

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
//   let result
//   events.on('**.fired', (msg) => result = msg)
//   events.emit('network.letters.3.fired.connect', 'it worked!')
//   expect(result).toBe(undefined)
// })

test('all events from a specific modality', () => {
  let result
  events.on('network.letters.**', function (event, msg) {
    console.log('here', this.event.split('.'))
    result = msg
  })
  events.emit('network.letters.3.fired.connect', 'it worked!')
  expect(result).toBe(undefined)
})
