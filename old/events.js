import EventEmitter from 'events'
const events = new EventEmitter()
events.setMaxListeners(0)

export default events
