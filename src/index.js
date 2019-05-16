import events from './events'

const Messages = {
  on (channel, fn) {
    events.on(channel, function (message) {
      const channels = this.event.split(':')
      fn(message, channels)
    })
  },
  once (channel, fn) {
    events.on(channel, function (message) {
      const channels = this.event.split(':')
      fn(message, channels)
    })
  },
  send (channel, msg) {
    events.emit(channel, msg)
  }
}

export default Messages
