import React, { useRef, useState } from "react"

const CountdownClock = ({ setClockIsVisible }) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const clockRef = useRef(null)
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  let endDate = "04/30/2022"

  const countDown = new Date(endDate).getTime()
  const x = setInterval(function () {
    const now = new Date().getTime(),
      timeLeft = countDown - now

    setDays(Math.floor(timeLeft / day))
    setHours(Math.floor((timeLeft % day) / hour))
    setMinutes(Math.floor((timeLeft % hour) / minute))
    setSeconds(Math.floor((timeLeft % minute) / second))

    if (timeLeft < 0) {
      setClockIsVisible(false)
      clearInterval(x)
    }
  }, 0)

  return (
    <div className="clock__container">
      <div className="clock__title">Countdown till our&nbsp;trek through</div>
      <div className="clock__subtitle">the&nbsp;southwest</div>
      <div className="clock__clock" ref={clockRef}>
        <div className="clock__column">
          <div className="clock__column-digit">{days}</div>
          <div className="clock__column-text">Days</div>
        </div>
        <div className="clock__column">
          <div className="clock__column-digit">{hours}</div>
          <div className="clock__column-text">Hrs</div>
        </div>
        <div className="clock__column">
          <div className="clock__column-digit">{minutes}</div>
          <div className="clock__column-text">Mins</div>
        </div>
        <div className="clock__column">
          <div className="clock__column-digit">{seconds}</div>
          <div className="clock__column-text">Secs</div>
        </div>
      </div>
    </div>
  )
}

export default CountdownClock
