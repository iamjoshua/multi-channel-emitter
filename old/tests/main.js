//import events from '../index'

var EventEmitter2 = require('eventemitter2').EventEmitter2;
var events = new EventEmitter2()

// ------------------------------------
//
// ------------------------------------

describe('events as strings without channels', () => {
  test('emitter and listener use same event', () => {
    let result
    events.on('test', (msg) => result = msg)
    events.emit('test', 'it worked!')
    expect(result).toBe('it worked!')
  })

  test('emitter and listener use different events', () => {
    let result
    events.on('one', (msg) => result = msg)
    events.emit('two', 'it worked!')
    expect(result).toBe(undefined)
  })
})

describe('events as objects without channels', () => {
  test('emitter and listener use same object', () => {
    let result
    events.on({event: 'one'}, (msg) => result = msg)
    events.emit({event: 'one'}, 'it worked!')
    expect(result).toBe('it worked!')
  })

  test('emitter and listener use a different object', () => {
    let result
    events.on({event: 'one'}, (msg) => result = msg)
    events.emit({event: 'two'}, 'it worked!')
    expect(result).toBe(undefined)
  })
})

describe('channels and events in shared object', () => {
  test('emitter and listener use the same channel and event', () => {
    let result
    events.on({type: 'book', event: 'one'}, (msg) => result = msg)
    events.emit({type: 'book', event: 'one'}, 'it worked!')
    expect(result).toBe('it worked!')
  })

  test('emitter and listener use the same event on a different channel', () => {
    let result
    events.on({type: 'book', event: 'one'}, (msg) => result = msg)
    events.emit({type: 'chapter', event: 'one'}, 'it worked!')
    expect(result).toBe(undefined)
  })

  test('emitter and listener use a different event on the same channel', () => {
    let result
    events.on({type: 'book', event: 'one'}, (msg) => result = msg)
    events.emit({type: 'book', event: 'two'}, 'it worked!')
    expect(result).toBe(undefined)
  })
})

describe('channels as objects and events as strings', () => {
  test('emitter and listener use the same channel and event', () => {
    let result
    events.on({type: 'book'}, 'one', (msg) => result = msg)
    events.emit({type: 'book'}, 'one', 'it worked!')
    expect(result).toBe('it worked!')
  })

  test('emitter and listener use a different channel but the same event', () => {
    let result
    events.on({type: 'book'}, 'one', (msg) => result = msg)
    events.emit({type: 'chapter'}, 'one', 'it worked!')
    expect(result).toBe(undefined)
  })

  test('emitter and listener use the same channel but different event', () => {
    let result
    events.on({type: 'book'}, 'one', (msg) => result = msg)
    events.emit({type: 'book'}, 'two', 'it worked!')
    expect(result).toBe(undefined)
  })
})


//
//
// test('event as string should work', () => {
//   const event = 'test'
//   const message = 'it worked!'
//
//   events.on(event, (msg) => expect(msg).toBe(message))
//   events.emit(event, message)
// })
//
// test('event as object should work', () => {
//   const event = 'test'
//   const message = 'it worked!'
//
//   events.on({event}, (msg) => expect(msg).toBe(message))
//   events.emit({event}, message)
// })
//
// test('channel/event object only should work', () => {
//   const event = 'test'
//   const params = {type: 'book', event}
//   const message = 'it worked!'
//
//   events.on(params, (msg) => expect(msg).toBe(message))
//   events.emit(params, message)
// })
//
// test('channel object plus event string should work', () => {
//   const event = 'test'
//   const channel = {type: 'book'}
//   const message = 'it worked!'
//
//   events.on(channel, event, (msg) => expect(msg).toBe(message))
//   events.emit(channel, event, message)
// })
//
// // ------------------------------------
// // No Nos
// // ------------------------------------
//
// test('event listeners should not receive different events', () => {
//   let receivedCount = 0
//
//   events.on('one', (msg) => expect(++receivedCount).toBe(1))
//   events.on('two', (msg) => expect(++receivedCount).toBe(1))
//
//   events.emit('two', 'NOOOO')
// })
