import _ from 'lodash'
import events from './events'
import time from './time'

// ------------------------------------
// Stat counters
// ------------------------------------

// the time object use these to manage time
// how many events queued for next time step
events.nextCount = 0
// nextCount becomes lastCount after step change. Count down to know when done.
events.lastCount = 0
// events to run before time advance. Advance once zero
events.endCount = 0

// ------------------------------------
// Private
// ------------------------------------

const send = (spaces, message) => {
  let listeners = queue.filter(q => _.isMatch(spaces, q.spaces))
  listeners.map(l => l.fn(message))
}

const schedule = (waitEvent = 'time-advance', {spaces, message}) => {
  events.nextCount++
  events.once(waitEvent, () => {
    send(spaces, message)
    if (!--events.lastCount) events.emit('last-message')
  })
}

const build = (spaces, event, message) => {
  // if event is the first argument create the spaces object with the event
  if (_.isString(spaces)) spaces = {event: spaces}

  // if one of the first two args combined, message will be in event arg
  if (!message) message = event

  return {spaces, message}
}

// ------------------------------------
// Core object
// ------------------------------------

const queue = []

const Messages = {
  advanceTime () {
    time.advance()
  },
  on (spaces, event, fn) {
    const params = build(spaces, event, fn)
    spaces = params.spaces
    fn = params.message
    queue.push({spaces, fn})
  },
  once (spaces, event, fn) {
    const params = build(spaces, event, fn)
    if (params.event === 'last-message') events.endCount++
    events.once(params.event, (...msgs) => {
      fn(...msgs)
      if (params.event !== 'last-message') return
      if (!--events.endCount) events.emit('last-message')
    })
  },
  onceLast (fn) {
    Messages.once('last-message', fn)
  },
  // onNext (fn, eventName = 'time-advance') {
  //   schedule(eventName, false, fn)
  // },

  // spaces = {modality: 'light', layer: 2}
  // spaces = {modality: 'sound', layer: 3}

  // if no one is listening on a channel is it even heard?

  send (spaces, event, message) {
    const params = build(spaces, event, message)
    schedule('time-advance', params)
  },
  passthrough (spaces, event, message) {
    const params = build(spaces, event, message)
    send(params.spaces, params.message)
  }
}

// ------------------------------------
// Listeners
// ------------------------------------

Messages.on('last-message', () => {
  if (!events.endCount) events.emit('final-message')
})

// ------------------------------------
// Export
// ------------------------------------

export default Messages
