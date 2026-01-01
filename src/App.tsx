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
  const countDownDateRef = useRef(new Date("Jan 1, 2027 00:00:00").getTime())
  // const countDownDateRef = useRef(new Date("Dec 31, 2024 19:56:55").getTime())
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const [isHappyNewYear, setIsHappyNewYear] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      return stored === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save to localStorage
    localStorage.setItem('darkMode', String(isDarkMode))
  }, [isDarkMode])

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
      if (now < countDownDateRef.current) {
        setCountDown(formattedDays + " : " + formattedHours + " : " + formattedMinutes + " : " + formattedSeconds)
      } else {
        setIsHappyNewYear(true)
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // Call once to set initial time

    return () => clearInterval(interval);
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <div className='space-y-1'>
      <div className='absolute top-0 right-0 m-8 flex items-center gap-4'>
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        <button className='bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg'>
          {time}
        </button>
      </div>
      <div className='flex w-full justify-center'>
        <a className='aspect-square flex flex-col items-center justify-center max-h-36' href="#">
          <img 
            src={reactLogo} 
            className={`logo pog !h-60 max-w-none ${!isHappyNewYear ? 'animate-animate-spin-20s' : 'animate-pulse'}`} 
            alt="RCCG logo"
            loading="eager"
            decoding="async"
          />
        </a>
      </div>
      {isHappyNewYear ? <SvgText/> : (
        <>
          <p className="text-4xl md:text-6xl text-gray-900 dark:text-white relative z-10">Place Of <span className="text-[gold] font-[myFirstFont]">GOLD</span></p>
          <h1 ref={textRef} className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-[gold] dark:from-white dark:to-[gold] p-1'>{countDown}</h1>
        </>
      )}
      <div className="card">
        <p className="text-gray-700 dark:text-gray-300">
          Countdown <code className="text-gray-900 dark:text-gray-100">to</code> the year 2027.
        </p>
      </div>
      <p className="read-the-docs text-gray-600 dark:text-gray-400">
        Designed by <b>Ayomide</b>
      </p>
    </div>
  )
}

export default App
// const _sentenceEndExp = /(\.|\?|!)$/g; //regular expression to sense punctuation that indicates the end of a sentence so that we can adjust timing accordingly


// function machineGun(text: string, containerRef: React.MutableRefObject<HTMLDivElement | null>) {
//   const words = text.split(" ");
//   const container = containerRef.current
//   const  tl = gsap.timeline({delay:0.6, repeat:2, repeatDelay:4});
//   const  wordCount = words.length;
//   let  time = 0;
//   let  word, element, duration, isSentenceEnd, i;
  
//   for(i = 0; i < wordCount; i++){
//     word = words[i];
//     isSentenceEnd = _sentenceEndExp.test(word);

//     // const h3 = document.createElement('h3')
//     // h3.innerText = word
//     if (container) container.innerHTML = "<h3>" + word + "</h3>"
//     element = container

//     duration = Math.max(0.5, word.length * 0.08); //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
//     if (isSentenceEnd) {
//       duration += 0.6; //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
//     }
//     //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
//     gsap.set(element, {autoAlpha:0, scale:0, z:0.01});
//     //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
//     tl.to(element, duration, {scale:1.2,  ease:"slow(0.25, 0.9)"}, time)
//       //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end. 
// 		 	.to(element, duration, {autoAlpha:1, ease:"slow(0.25, 0.9, true)"}, time);
//     time += duration - 0.05;
//     if (isSentenceEnd) {
//       time += 0.6; //at the end of a sentence, add a pause for dramatic effect.
//     }
//   }
  
// }

const SvgText = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const fromTextRef = useRef<HTMLParagraphElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const msgRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const displayText = () => {
      // Kill any existing timeline to prevent conflicts
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      msgRef.current = false
      
      if (!textRef.current || !containerRef.current) return

      // Store original text content
      const originalText = "Happy New Year"
      const originalContainerText = "Place Of GOLD"
      const spanHTML = '<span class="text-[gold] font-[myFirstFont]">GOLD</span>'

      // Set initial state with GPU acceleration and opacity
      gsap.set([textRef.current, containerRef.current, fromTextRef.current], {
        force3D: true,
        willChange: "contents, opacity, transform"
      })

      // Create main timeline with smooth easing
      const masterTimeline = gsap.timeline({
        defaults: {
          force3D: true
        }
      })

      // Animate "Happy New Year" with smooth text reveal and fade-in
      masterTimeline
        .set(textRef.current, { 
          text: "",
          opacity: 0,
          scale: 0.9
        })
        .to(textRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        })
        .to(textRef.current, {
          text: originalText,
          duration: originalText.length * 0.12,
          ease: "power1.inOut",
          force3D: true
        }, "-=0.3") // Start text animation slightly before fade completes

      // Animate "from" text with a subtle entrance
      if (fromTextRef.current) {
        gsap.set(fromTextRef.current, { opacity: 0, y: 20 })
        masterTimeline.to(fromTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.5")
      }

      // Animate container text with smooth reveal
      const tempText = containerRef.current.textContent || originalContainerText
      containerRef.current.textContent = ""
      
      masterTimeline
        .set(containerRef.current, {
          text: "",
          opacity: 0,
          scale: 0.95
        })
        .to(containerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(containerRef.current, {
          text: tempText,
          duration: originalContainerText.length * 0.1,
          ease: "power1.inOut",
          force3D: true,
          onComplete: () => {
            // Restore the span after animation with a subtle highlight effect
            if (containerRef.current) {
              containerRef.current.innerHTML = `Place Of ${spanHTML}`
              const goldSpan = containerRef.current.querySelector('span')
              if (goldSpan) {
                gsap.fromTo(goldSpan, 
                  { scale: 1.2, opacity: 0 },
                  { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.4,
                    ease: "back.out(1.7)"
                  }
                )
              }
            }
          }
        }, "-=0.2")

      timelineRef.current = masterTimeline

      setTimeout(() => {
        msgRef.current = true
      }, 8000);
    }
    
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(displayText, 100);
    const interval = setInterval(displayText, 9000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    }
  }, [])

  // if (msgRef.current) return <h2 className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-white to-[gold] p-2'>Welcome to 2027</h2>

  return (
    <div className='space-y-1'>
      <h1 
        ref={textRef} 
        className='min-[876px]:text-9xl md:text-8xl min-[1040px]:text-[10rem] font-base react bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-[gold] dark:from-white dark:to-[gold] p-2'
        style={{ willChange: 'contents, opacity, transform', transform: 'translateZ(0)' }}
      >
        Happy New Year
      </h1>
      <p 
        ref={fromTextRef}
        className="font-[myFirstFont] text-3xl text-gray-900 dark:text-white"
        style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      >
        from
      </p>
      <p 
        ref={containerRef} 
        className="text-4xl md:text-6xl text-gray-900 dark:text-white"
        style={{ willChange: 'contents, opacity, transform', transform: 'translateZ(0)' }}
      >
        Place Of <span className="text-[gold] font-[myFirstFont]">GOLD</span>
      </p>
    </div>
  )
}