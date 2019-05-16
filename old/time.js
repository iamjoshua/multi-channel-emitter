import events from './events'
import Confirm from 'prompt-confirm'

// ------------------------------------
// Settings
// ------------------------------------

// if true, a confirmation dialog will be present at the CL
const manualTime = true
// if automatic, the pace of time advancement
const throttle = 500

// ------------------------------------
// Private
// ------------------------------------

const advance = () => {
  time.needConfirmation = false
  time.current++
  Log.resetTabs()
  Log.time(`---------${time.current}---------`)
  // stop incr and begin decr to track event progress
  events.lastCount = events.nextCount
  events.nextCount = 0

  // this will trigger the queued up events
  events.emit('time-advance', time.current)
}

// ------------------------------------
// Public object
// ------------------------------------

const time = {
  isReady: true,
  needConfirmation: false,
  current: 0,
  advance () {
    if (time.needConfirmation) return false

    // time.isReady = false
    if (!events.nextCount) {
      time.isReady = true
      events.emit('time-still')
      return false
    }

    time.isReady = false

    if (manualTime) {
      time.needConfirmation = new Confirm('Advance time?')
      time.needConfirmation.ask((answer) => {
        advance()
      })
    } else{
      setTimeout(advance, throttle)
    }
  }
}

// ------------------------------------
// Listeners
// ------------------------------------

// when all events for this time step have been completed, advance time a step
events.on('final-message', time.advance)

// ------------------------------------
// Export
// ------------------------------------

export default time
