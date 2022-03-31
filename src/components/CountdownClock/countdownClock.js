import anime from "animejs"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const CountdownClock = () => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const clockRef = useRef(null)
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  let birthday = "04/30/2022"

  const countDown = new Date(birthday).getTime()
  const x = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown - now

    setDays(Math.floor(distance / day))
    setHours(Math.floor((distance % day) / hour))
    setMinutes(Math.floor((distance % hour) / minute))
    setSeconds(Math.floor((distance % minute) / second))

    //do something later when date is reached
    if (distance < 0) {
      document.getElementById("headline").innerText = "It's my birthday!"
      document.getElementById("countdown").style.display = "none"
      document.getElementById("content").style.display = "block"
      clearInterval(x)
    }
    //seconds
  }, 0)

  useEffect(() => {
    const sun = document.querySelector("#sun")
    const leftMountains = document.querySelectorAll(".mountain-left")
    const rightMountains = document.querySelectorAll(".mountain-right")

    clockRef.current.addEventListener("mouseenter", () => {
      anime({
        targets: leftMountains,
        translateX: -20,
        duration: 3000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
      anime({
        targets: rightMountains,
        translateX: 20,
        duration: 3000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
      anime({
        targets: sun,
        translateY: -150,
        duration: 10000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
    })
    clockRef.current.addEventListener("mouseleave", () => {
      anime({
        targets: leftMountains,
        translateX: 0,
        duration: 3000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
      anime({
        targets: rightMountains,
        translateX: 0,
        duration: 3000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
      anime({
        targets: sun,
        translateY: 0,
        duration: 3000,
        loop: 1,
        direction: "alternate",
        easing: "easeOutElastic",
      })
    })
  }, [])

  return (
    <div className="clock__container">
      <div className="clock__title">
        Countdown till our trek through the&nbsp;southwest
      </div>
      <div className="clock__clock" ref={clockRef}>
        <div className="clock__column">
          <div className="clock__column clock__column--digit">{days}</div>
          <div className="clock__column clock__column--text">Days</div>
        </div>
        <div className="clock__column">
          <div className="clock__column clock__column--digit">{hours}</div>
          <div className="clock__column clock__column--text">Hours</div>
        </div>
        <div className="clock__column">
          <div className="clock__column clock__column--digit">{minutes}</div>
          <div className="clock__column clock__column--text">Minutes</div>
        </div>
        <div className="clock__column">
          <div className="clock__column clock__column--digit">{seconds}</div>
          <div className="clock__column clock__column--text">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default CountdownClock
