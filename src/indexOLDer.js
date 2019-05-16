import EventEmitter from 'events'
import _ from 'lodash'

// ------------------------------------
// Create default node events
// ------------------------------------

const ee = new EventEmitter()
ee.setMaxListeners(0)

// ------------------------------------
// Private
// ------------------------------------

const send = (spaces, message) => {
  let listeners = queue.filter(q => _.isMatch(spaces, q.spaces))
  listeners.map(l => l.fn(message))
}

const build = (spaces, event, payload) => {
  // if event is the first argument create the spaces object with the event
  if (_.isString(spaces)) spaces = {event: spaces}

  // if one of the first two args combined, payload will be in event arg
  if (!payload) payload = event

  return {spaces, payload}
}

// ------------------------------------
// Core object
// ------------------------------------

const queue = []

const Events = {
  on (spaces, event, fn, once = false) {
    const params = build(spaces, event, fn)
    spaces = params.spaces
    fn = params.payload
    queue.push({spaces, fn, once})
  },
  once (spaces, event, fn) {
    Events.on(spaces, event, fn, true)
  },
  emit (spaces, event, payload) {
    const params = build(spaces, event, payload)
    const listeners = queue.filter(q => _.isMatch(params.spaces, q.spaces))
    listeners.map(l => l.fn(params.payload))
  }
}

// ------------------------------------
// Export
// ------------------------------------

export default Events
