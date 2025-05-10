import Swiper, { EffectFade, Mousewheel, Navigation, Autoplay, FreeMode } from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { pad, useState } from './modules/helpers/helpers';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import popupFormPlanning from './modules/popup-form-planning/popup-form-planning';

// const header = document.querySelector('.header');

// const headroom = new Headroom(header, {});
// headroom.init();

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

Swiper.use([Mousewheel, Navigation, FreeMode]);



new Swiper('[data-slides-slider]', {
  //data-slides-slider-prev
  //data-slides-slider-next
  navigation: {
    nextEl: '[data-slides-slider-next]',
    prevEl: '[data-slides-slider-prev]',
  },

})


function advantagesTabsHandler() {
  const tabs = document.querySelectorAll('[data-advantage-tab]');
  const containers = document.querySelectorAll('[data-advantage-tab-container]');
  const [ currentTab, setCurrentTab, subscribeCurrentTab ] = useState(null);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const dataset = tab.dataset.advantageTab;
      setCurrentTab(dataset);
    });
  });

  subscribeCurrentTab((value) => {

    containers.forEach((container, i) => {
      const dataset = container.dataset.advantageTabContainer;
      if (value == dataset) {
        container.classList.add('active');
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      } else {
        gsap.fromTo(container, { opacity: 1 }, { opacity: 0, duration: 0.5 });
        container.classList.remove('active');
      }
    });

    tabs.forEach((tab, i) => {
      const dataset = tab.dataset.advantageTab;
      if (dataset == value) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  });

  tabs.forEach(el => {
    if (el.classList.contains('active')) {
      const dataset = el.dataset.advantageTab;
      setCurrentTab(dataset);
    }
  })
}

advantagesTabsHandler();


function gallerySliderHandler() {

  const images = {
    territoriya: ['./assets/images/gallery/image1.jpg', './assets/images/gallery/image1.jpg'],
    rozvagy: ['./assets/images/gallery/image1.jpg'],
    hall: ['./assets/images/gallery/image1.jpg'],
    zhytlovyi_poverh: ['./assets/images/gallery/image1.jpg'],
    parking: ['./assets/images/gallery/image1.jpg'],
    ukrytia: ['./assets/images/gallery/image1.jpg'],
  }

  const [ galleryFilter, setGalleryFilter, subscribeGalleryFilter ] = useState('');

  document.querySelectorAll('[data-gallery-filter-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const dataset = button.dataset.galleryFilterButton;
      setGalleryFilter(dataset);
    });
  })

  let fullTick = document.querySelectorAll('[data-gallery-slider] .swiper-slide').length - 1;
  fullTick = fullTick * 315 + 695;
  const oneTick = 315;
  
  const convertedTick = gsap.utils.mapRange(0, fullTick, 0, 1, oneTick);

  console.log('convertedTick', convertedTick);
  

  const swiper = new Swiper('[data-gallery-slider]', {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween : 8,
    autoHeight: true,
    // freeMode: true,
    simulateTouch: false,
    speed: 800,
    navigation: {
      nextEl: '[data-gallery-slider-next]',
      prevEl: '[data-gallery-slider-prev]',
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 0,
        autoHeight: true,
        centeredSlides: false,
        simulateTouch: true,
      }
    },
    on: {
      slideChangeTransitionEnd: (swiper) => {
        swiper.update();
        // swiper.updateSize();
      }
    }
  });

  // document.querySelector('[data-gallery-slider-next]').addEventListener('click', () => {
  //   swiper.setProgress(swiper.progress + convertedTick, 800);
  // });
  // document.querySelector('[data-gallery-slider-prev]').addEventListener('click', () => {
  //   swiper.setProgress(swiper.progress - convertedTick, 800);
  // });

  subscribeGalleryFilter((value) => {

    document.querySelectorAll('[data-gallery-filter-button]').forEach((button) => {
      const dataset = button.dataset.galleryFilterButton;
      if (dataset == value) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    })
    const newGallery = images[value];
    const swiperWrapper = swiper.wrapperEl;
    console.log('swiperWrapper', swiperWrapper);

    swiper.wrapperEl.innerHTML = newGallery.map((image, index) => {
      return `
        <div class="swiper-slide">
          <img src="${image}" alt="gallery image">
        </div>
      `;
    }).join('');
    swiper.update();
    

  })
}

gallerySliderHandler();



//data-popup-video 


function constructionSliderHandler() {
  return new Swiper('[data-construction-slider]', {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  })
}

const constructionSlider = constructionSliderHandler();


//data-construction-filter

function constructionFilterHandler(slider) {

  const [ constructionFilter, setConstructionFilter, subscribeConstructionFilter ] = useState({

  });

  const filters = document.querySelectorAll('[data-construction-filter]');
  filters.forEach((filter) => {
    filter.addEventListener('change',function(evt){
      const dataset = evt.target.dataset.constructionFilter;
      const value = evt.target.value;
      setConstructionFilter({
        ...constructionFilter(),
        [dataset]: value
      });
    });
  });

  subscribeConstructionFilter((value) => {
    console.log('value', value);
    
    document.querySelectorAll('[data-construction-card]').forEach((card) => {
      let isShow = true;
      Object.entries(value).forEach(([key, val]) => {
        const cardSingleFilterValue = card.dataset[key];
        console.log('dataset', cardSingleFilterValue);
        if (cardSingleFilterValue != val) {
          isShow = false;
        } 
      })
      card.style.display = isShow ? '' : 'none';
    });
    slider.update();
  })
}

constructionFilterHandler(constructionSlider);

popupFormPlanning();


function formSuccessHandler() {
  const [ formSuccess, setFormSuccess, subscribeFormSuccess ] = useState(false);
  window.addEventListener('formSuccess', () => {
    setFormSuccess(true);
  });
  const popup = document.querySelector('[data-form-success-popup]');
    document.body.addEventListener('click',function successPopupOpen(evt){
        const target = evt.target.closest('[data-form-success-popup-open]');
        if (!target) {
            return;
        }
        setFormSuccess(true);
    });

    document.body.addEventListener('click',function successPopupClose(evt){
        const target = evt.target.closest('[data-form-success-popup-close]');
        if (!target) {
            return;
        }
        setFormSuccess(false);
    });

    subscribeFormSuccess((value) => {
        if (value) {
            popup.classList.add('active');
            document.body.classList.add('popup-open');
            window.dispatchEvent(new Event('resize-me'));
        } else {
            popup.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    })
}
formSuccessHandler();

function callbackPopupHandler() {
  const [ formSuccess, setFormSuccess, subscribeFormSuccess ] = useState(false);
  const popup = document.querySelector('[data-callback-popup]');
    document.body.addEventListener('click',function successPopupOpen(evt){
        const target = evt.target.closest('[data-callback-popup-open]');
        if (!target) {
            return;
        }
        setFormSuccess(true);
    });

    document.body.addEventListener('click',function successPopupClose(evt){
        const target = evt.target.closest('[data-callback-popup-close]');
        if (!target) {
            return;
        }
        setFormSuccess(false);
    });

    subscribeFormSuccess((value) => {
        if (value) {
            popup.classList.add('active');
            document.body.classList.add('popup-open');
            window.dispatchEvent(new Event('resize-me'));
        } else {
            popup.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    })
}

callbackPopupHandler();

function mobileNewsHandler() {
  if (window.screen.width > 767) {
    return;
  }
  const hiddenNews = document.querySelectorAll('[data-news-hidden-on-mobile]')

  //data-news-hidden-on-mobile
  //data-news-reveal-mobile

  hiddenNews.forEach((el) => {
    el.style.display = 'none';
  });


  document.querySelectorAll('[data-news-reveal-mobile]').forEach((el) => {
    el.addEventListener('click', (evt) => {
      hiddenNews.forEach((el) => {
        el.style.display = '';
      });
      el.remove();
    })
  })
}

mobileNewsHandler();


function documentsSlider() {
  new Swiper('[data-documents-slider]', {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '[data-documents-slider-next]',
      prevEl: '[data-documents-slider-prev]',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1360: {
        slidesPerView: 6,
        spaceBetween: 30,
      }
    }
  })
}
documentsSlider();