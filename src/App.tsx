import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/CHURCH OF GOD.png'
import './App.css'
import gsap from "gsap"
import { EasePack } from "gsap/EasePack";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin, EasePack);

function App() {
  const [time, setTime] = useState('')
  const [countDown, setCountDown] = useState('')
  // const countDownDateRef = useRef(new Date("Jan 1, 2025 00:00:00").getTime())
  const countDownDateRef = useRef(new Date("Dec 31, 2024 19:56:55").getTime())
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const [isHappyNewYear, setIsHappyNewYear] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Format time as 2-digit numbers
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      // Display the time
      setTime(`${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Call once to set initial time

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const updateTimer = () => {
      const countDownDate = countDownDateRef.current;
      const now = new Date().getTime();
  
      // Find the distance between now an the count down date
      const distance = countDownDate - now;
  
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format time as 2-digit numbers
      const formattedDays = days < 10 ? `0${days}` : days;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
      // Display the result in an element with id="countdown"
      if (new Date().getTime() < countDownDateRef.current) setCountDown(formattedDays + " : " + formattedHours + " : " + formattedMinutes + " : " + formattedSeconds)
      else {
        // setCountDown("Happy New Year")
        setIsHappyNewYear(true)
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Call once to set initial time

    return () => clearInterval(interval);
  }, [countDown])

  return (
    <div className='space-y-1'>
      <button className='absolute top-0 right-0 m-8'>
        {time}
      </button>
      <div className='flex w-full justify-center'>
        <a className='aspect-square flex flex-col items-center justify-center max-h-36' href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`logo pog !h-60 max-w-none ${!isHappyNewYear ? 'animate-animate-spin-20s' : 'animate-pulse'}`} alt="RCCG logo" />
        </a>
      </div>
      {isHappyNewYear ? <SvgText/> : (
        <>
          <p className="text-4xl md:text-6xl">Place Of <span className="text-[gold] font-[myFirstFont]">GOLD</span></p>
          <h1 ref={textRef} className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-white to-[gold] p-1'>{countDown}</h1>
        </>
      )}
      <div className="card">
        <p>
          Countdown <code>to</code> the year 2025.
        </p>
      </div>
      <p className="read-the-docs">
        Designed by <b>Ayomide</b>
      </p>
    </div>
  )
}

export default App
const _sentenceEndExp = /(\.|\?|!)$/g; //regular expression to sense punctuation that indicates the end of a sentence so that we can adjust timing accordingly


function machineGun(text: string, containerRef: React.MutableRefObject<HTMLDivElement | null>) {
  const words = text.split(" ");
  const container = containerRef.current
  const  tl = gsap.timeline({delay:0.6, repeat:2, repeatDelay:4});
  const  wordCount = words.length;
  let  time = 0;
  let  word, element, duration, isSentenceEnd, i;
  
  for(i = 0; i < wordCount; i++){
    word = words[i];
    isSentenceEnd = _sentenceEndExp.test(word);

    // const h3 = document.createElement('h3')
    // h3.innerText = word
    if (container) container.innerHTML = "<h3>" + word + "</h3>"
    element = container

    duration = Math.max(0.5, word.length * 0.08); //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
    if (isSentenceEnd) {
      duration += 0.6; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
    }
    //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
    gsap.set(element, {autoAlpha:0, scale:0, z:0.01});
    //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
    tl.to(element, duration, {scale:1.2,  ease:"slow(0.25, 0.9)"}, time)
      //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end. 
		 	.to(element, duration, {autoAlpha:1, ease:"slow(0.25, 0.9, true)"}, time);
    time += duration - 0.05;
    if (isSentenceEnd) {
      time += 0.6; //at the end of a sentence, add a pause for dramatic effect.
    }
  }
  
}

const SvgText = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const msgRef = useRef(false)

  useEffect(() => {
    const displayText = () => {
      msgRef.current = false
      const words: HTMLHeadingElement[] = gsap.utils.toArray(textRef.current),
      tl = gsap.timeline({delay: 0.5}),
      timePerCharacter = 0.2;

      words.forEach(el => {
        tl.from(el, {text: "", duration: el.innerHTML.length * timePerCharacter, ease: "none"});
      });

      const cwords: HTMLDivElement[] = gsap.utils.toArray(containerRef.current),
      ctl = gsap.timeline({delay: 3}),
      ctimePerCharacter = 0.1;

      cwords.forEach(el => {
        ctl.from(el, {text: "", duration: el.innerHTML.length * ctimePerCharacter, ease: "none"});
      });

      setTimeout(() => {
        msgRef.current = true
      }, 12000);
    }
    displayText();
    const interval = setInterval(displayText, 13000);

    return () => clearInterval(interval);
  }, [])

  // if (msgRef.current) return <h2 className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-white to-[gold] p-2'>Welcome to 2025</h2>

  return (
    <div className='space-y-1'>
      <h1 ref={textRef} className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-white to-[gold] p-2'>{"Happy New Year"}</h1>
      <p className="font-[myFirstFont]">from</p>
      <p ref={containerRef} className="text-4xl md:text-6xl">Place Of <span className="text-[gold] font-[myFirstFont]">GOLD</span></p>
    </div>
  )
}