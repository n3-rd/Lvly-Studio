import './style.css'
import fitty from 'fitty';
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from "gsap";
import Rellax from 'rellax';

import Lenis from '@studio-freight/lenis'


const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
  direction: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
Splitting();

const tl = gsap.timeline();

const mainAnimation = ()=>{
  tl.from(".first-text-chars .inner .char", {
    duration: 1,
    y: 300,
    stagger:0.3
  })
  .from(".second-text-chars .inner .char", {
    duration: 1,
    y: 300,
    stagger:0.3
  })
}

const initCursor = ()=>{
  const cursorRounded = document.querySelector('.custom-cursor .circle');
  const cursorPointed = document.querySelector('.custom-cursor .dot');

  document.addEventListener('mousemove', (e) => {
    cursorRounded.style.top = e.pageY + 'px';
    cursorRounded.style.left = e.pageX + 'px';
    cursorPointed.style.top = e.pageY + 'px';
    cursorPointed.style.left = e.pageX + 'px';
    // give cursorPointed a stagger
    cursorRounded.style.transition = 'all 0.1s linear';
  })
//  move the cursor on scroll
    window.addEventListener('scroll', (e) => {
        cursorRounded.style.top = e.pageY + 'px';
        cursorRounded.style.left = e.pageX + 'px';
        cursorPointed.style.top = e.pageY + 'px';
        cursorPointed.style.left = e.pageX + 'px';
    })
}

const removePreloader = ()=>{
  const preloader = document.querySelector('.preloader');
  tl.to(preloader, {
    duration: 1,
    opacity: 0,
    onComplete: ()=>{
      preloader.style.display = 'none';
    }
  })
}

const initMagicHover = ()=>{
  const magicHoverElement = document.querySelectorAll(".magic-hover");
  const cursorRounded = document.querySelector('.custom-cursor .circle');
  const cursorPointed = document.querySelector('.custom-cursor .dot');

  magicHoverElement.forEach((e)=>{
    e.addEventListener("mouseenter", ()=>{
      cursorRounded.classList.add("blurry-cursor");
      cursorPointed.style.display = "none"
      })
      e.addEventListener("mouseleave", ()=>{
        cursorRounded.classList.remove("blurry-cursor");
        cursorPointed.style.display = "block"
      })
  })


}

const setLightMode = ()=>{
  document.body.classList.remove('dark');
  document.body.classList.add('light');
}

const setDarkMode = ()=>{
  document.body.classList.remove('light');
  document.body.classList.add('dark');
}

const initThemes = ()=>{
  var lightModeToggle = document.getElementById("light-mode");
  var darkModeToggle = document.getElementById("dark-mode");

  lightModeToggle.addEventListener('click', (e)=>{
    setLightMode()
    lightModeToggle.style.fontWeight = "900"
    darkModeToggle.style.fontWeight = "200"
  })

  darkModeToggle.addEventListener('click', ()=>{
    setDarkMode()
    darkModeToggle.style.fontWeight = "900"
    lightModeToggle.style.fontWeight = "200"
  })
}

const fitText = ()=>{
  fitty('.fit-text');
}

addEventListener("DOMContentLoaded", ()=>{
  document.addEventListener("change", ()=>{
    alert('resized')
    fitText();
  })

  fitText()
  var rellax = new Rellax('.rellax');
  initThemes()
  initCursor();
  initMagicHover();
  setTimeout(()=>{
    removePreloader();
    mainAnimation();

  }, 2000)
})