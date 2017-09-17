const five = require('johnny-five')
const board = new five.Board()

board.on('ready', () => {
  const servo = new five.Servo({
    pin: 9,
    range: [55, 115],
    interval: 250
  })
  const proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 'A0',
    threshold: 10,
    type: 'analog'
  })
  const collisionLed = new five.Led(2)

  proximity.on('data', () => {
    // console.log('data stream')
    // console.log(this)
  })

  proximity.on('change', ({ cm }) => {
    console.log('  cm  : ', cm)
    if (cm < 20) {
      servo.stop()
      collisionLed.on()
    } else {
      servo.sweep()
      collisionLed.off()
    }
  })
})
