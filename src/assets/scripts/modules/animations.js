import { gsap, ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);
console.log('animations');
const quotes = document.querySelectorAll('.text-anim');

window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  tl.to('.front-screen', {
    opacity: 1,
  })
    .fromTo(
      '.header',
      {
        opacity: 0,

        duration: 0.6,
        ease: 'power2.out',
      },
      { opacity: 1 },
      '<',
    )
    .fromTo(
      '.header .header__link',
      {
        opacity: 0,
        yPercent: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      },
      { opacity: 1, yPercent: 0, stagger: 0.1 },
      '<',
    )
    .from('.front-screen__bg2', { width: '100%', duration: 0.6 }, '<+=0.5')
    .fromTo(
      '.front-screen__logo',
      {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: 'power2.out',
      },
      { opacity: 1, y: 0 },
      '<',
    )
    .fromTo(
      '.front-screen__title',
      { delay: 0.2, opacity: 0, y: 50, duration: 0.4, ease: 'power2.out' },
      { opacity: 1, y: 0 },
      '<',
    ) // запуск разом з попередньою анімацією, злегка накладається
    .fromTo(
      '.front-screen .button',
      {
        autoAlpha: 0,
        opacity: 0,
        x: 30,
        duration: 0.4,
        ease: 'power2.out',
      },
      { opacity: 1, autoAlpha: 1, x: 0 },
      '<',
    );
});
function setupSplits() {
  quotes.forEach(quote => {
    // Reset if needed
    if (quote.anim) {
      quote.anim.progress(1).kill();
      quote.split.revert();
    }

    quote.split = SplitText.create(quote, {
      type: 'words',
      linesClass: 'split-line',
    });

    // Set up the anim
    quote.anim = gsap.from(quote.split.words, {
      scrollTrigger: {
        trigger: quote,

        start: 'top +=90%',
        // markers: { startColor: '#dfdcff', endColor: 'transparent' },
      },
      duration: 0.4,
      ease: 'circ.out',

      opacity: 0,
      y: 40,
      stagger: 0.03,
    });
  });
}

ScrollTrigger.addEventListener('refresh', setupSplits);
setupSplits();
const chars = document.querySelectorAll('.chars-anim');

function setupSplitsChars() {
  chars.forEach(quote => {
    // Reset if needed
    if (quote.anim) {
      quote.anim.progress(1).kill();
      quote.split.revert();
    }

    quote.split = SplitText.create(quote, {
      type: ' chars',
      linesClass: 'split-line',
    });

    // Set up the anim
    quote.anim = gsap.from(quote.split.chars, {
      scrollTrigger: {
        trigger: quote,

        start: 'top +=90%',
        // markers: { startColor: '#dfdcff', endColor: 'transparent' },
      },
      duration: 0.4,
      ease: 'circ.out',

      opacity: 0,
      x: 20,
      stagger: 0.02,
    });
  });
}

ScrollTrigger.addEventListener('refresh', setupSplitsChars);
setupSplitsChars();

// gsap.from('.plannings-title__svg-wrap svg', {
//   scrollTrigger: {
//     trigger: '.plannings-title__svg-wrap',

//     start: 'top center',
//     end: 'bottom center',
//     // markers: { startColor: '#dfdcff', endColor: 'transparent' },
//   },
//   opacity: 0,
//   y: 20,
// });

// gsap.from('.icon--sister', {
//   scrollTrigger: {
//     trigger: '.video-filler',
//     scrub: 1,
//     start: 'top center',
//     end: 'bottom center',
//     // markers: { startColor: '#dfdcff', endColor: 'transparent' },
//   },

//   yPercent: 20,
// });

// gsap.from('.video-img', {
//   scrollTrigger: {
//     trigger: '.video-filler',
//     scrub: 1,
//     start: 'top bottom',
//     end: 'bottom top',
//     // markers: { startColor: '#dfdcff', endColor: 'transparent' },
//   },
//   scale: 1.2,
//   yPercent: -10,
// });
