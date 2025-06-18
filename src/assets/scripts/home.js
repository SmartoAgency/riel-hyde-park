import Swiper, { EffectFade, Mousewheel, Navigation, Autoplay, FreeMode } from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { pad, useState } from './modules/helpers/helpers';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import popupFormPlanning from './modules/popup-form-planning/popup-form-planning';
import googleMap from './modules/map/map';


// const header = document.querySelector('.header');

// const headroom = new Headroom(header, {});
// headroom.init();

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

Swiper.use([Mousewheel, Navigation, FreeMode]);

const slider = new Swiper('[data-slides-slider]', {
  navigation: {
    nextEl: '[data-slides-slider-next]',
    prevEl: '[data-slides-slider-prev]',
  },
  on: {
    init: function() {
      handleIframes(this); // Запускаємо для першого активного слайду
    },
    slideChange: function() {
      handleIframes(this);
    },
  },
});

function handleIframes(swiper) {
  swiper.slides.forEach((slide, index) => {
    const iframe = slide.querySelector('iframe');
    if (!iframe) return;
    console.log(iframe);
    if (index === swiper.activeIndex) {
      // Активний слайд: додаємо src, якщо його ще немає
      console.log(iframe.src, iframe.dataset.src);

      iframe.src = iframe.dataset.src;
    } else {
      // Неактивні слайди: видаляємо src, щоб зупинити відео/контент
      iframe.src = '';
    }
  });
}

function advantagesTabsHandler() {
  const tabs = document.querySelectorAll('[data-advantage-tab]');
  const containers = document.querySelectorAll('[data-advantage-tab-container]');
  const [currentTab, setCurrentTab, subscribeCurrentTab] = useState(null);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const dataset = tab.dataset.advantageTab;
      setCurrentTab(dataset);
    });
  });

  subscribeCurrentTab(value => {
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
  });
}
//https://riel-hyde-park-wp.smarto.com.ua/wp-content/themes/3d/assets/images/characteristics/img3.jpg
advantagesTabsHandler();
googleMap();
function gallerySliderHandler() {
  const images = {
    territoriya: [
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya2.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya3.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya4.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya5.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya6.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya7.jpg',
      '/wp-content/themes/3d/assets/images/gallery/territoriya/territoriya8.jpg',
    ],
    rozvagy: [
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy2.jpg',
      // '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy3.jpg',
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy4.jpg',
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy5.jpg',
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy6.jpg',
      '/wp-content/themes/3d/assets/images/gallery/rozvagy/rozvagy7.jpg',
    ],
    hall: [
      '/wp-content/themes/3d/assets/images/gallery/hall/hall1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/hall/hall2.jpg',
    ],
    zhytlovyi_poverh: [
      '/wp-content/themes/3d/assets/images/gallery/zhytlovyi_poverh/zhytlovyi_poverh1.jpg',
    ],
    parking: [
      '/wp-content/themes/3d/assets/images/gallery/parking/parking1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/parking/parking2.jpg',
    ],
    ukrytia: ['/wp-content/themes/3d/assets/images/gallery/ukrytia/ukrytia1.jpg'],
    interier: [
      '/wp-content/themes/3d/assets/images/gallery/interier/interier1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier2.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier3.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier4.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier5.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier6.jpg',
      '/wp-content/themes/3d/assets/images/gallery/interier/interier7.jpg',
    ],
    spa: [
      '/wp-content/themes/3d/assets/images/gallery/spa/spa1.jpg',
      '/wp-content/themes/3d/assets/images/gallery/spa/spa2.jpg',
      '/wp-content/themes/3d/assets/images/gallery/spa/spa3.jpg',
      '/wp-content/themes/3d/assets/images/gallery/spa/spa4.jpg',
      '/wp-content/themes/3d/assets/images/gallery/spa/spa5.jpg',
      '/wp-content/themes/3d/assets/images/gallery/spa/spa6.jpg',
     
    ],
  };

  const [galleryFilter, setGalleryFilter, subscribeGalleryFilter] = useState('territoriya');

  document.querySelectorAll('[data-gallery-filter-button]').forEach(button => {
    button.addEventListener('click', () => {
      const dataset = button.dataset.galleryFilterButton;
      setGalleryFilter(dataset);
    });
  });

  // let fullTick = document.querySelectorAll('[data-gallery-slider] .swiper-slide').length - 1;
  // fullTick = fullTick * 315 + 695;
  // const oneTick = 315;

  // const convertedTick = gsap.utils.mapRange(0, fullTick, 0, 1, oneTick);

  // console.log('convertedTick', convertedTick);

  const swiper = new Swiper('[data-gallery-slider]', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 8,
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
        centeredSlides: true,
        // centeredSlides: false,
        simulateTouch: true,
      },
    },
    on: {
      slideChangeTransitionEnd: swiper => {
        swiper.update();
      },
    },
  });

  // document.querySelector('[data-gallery-slider-next]').addEventListener('click', () => {
  //   swiper.setProgress(swiper.progress + convertedTick, 800);
  // });
  // document.querySelector('[data-gallery-slider-prev]').addEventListener('click', () => {
  //   swiper.setProgress(swiper.progress - convertedTick, 800);
  // });

  subscribeGalleryFilter(value => {
    document.querySelectorAll('[data-gallery-filter-button]').forEach(button => {
      const dataset = button.dataset.galleryFilterButton;
      if (dataset == value) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    const newGallery = images[value];
    const swiperWrapper = swiper.wrapperEl;
    console.log('swiperWrapper', swiperWrapper);

    swiper.wrapperEl.innerHTML = newGallery
      .map((image, index) => {
        return `
        <div class="swiper-slide">
          <img loading="lazy" src="${image}" alt="gallery image">
        </div>
      `;
      })
      .join('');
    swiper.update();
  });
  setGalleryFilter('territoriya');
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
      },
    },
    navigation: {
      nextEl: '[data-construction-slider-next]',
      prevEl: '[data-construction-slider-prev]',
    },
  });
}

const constructionSlider = constructionSliderHandler();

function constructionFilterHandler(slider) {
  const [constructionFilter, setConstructionFilter, subscribeConstructionFilter] = useState({});

  const filters = document.querySelectorAll('[data-construction-filter]');

  // 1. Отримуємо дефолтні значення фільтрів
  const initialState = {};
  filters.forEach(filter => {
    const key = filter.dataset.constructionFilter;

    const options = filter.querySelectorAll('option');
    const lastOption = options[options.length - 1];
    const lastValue = lastOption.value;

    filter.value = lastValue; // встановлюємо в UI останнє значення
    initialState[key] = lastValue;

    console.log(`Фільтр "${key}" ініціалізовано значенням: ${lastValue}`);
  });

  // 2. Встановлюємо початковий стан фільтрів
  setConstructionFilter(initialState);

  //  Вручну тригеримо фільтрацію одразу після ініціалізації
  applyFilter(initialState);

  // 3. Вішаємо слухачі
  filters.forEach(filter => {
    filter.addEventListener('change', function(evt) {
      const key = evt.target.dataset.constructionFilter;
      const value = evt.target.value;
      const newState = {
        ...constructionFilter(),
        [key]: value,
      };
      setConstructionFilter(newState);
      applyFilter(newState); // 🔥 застосування фільтра при зміні
    });
  });

  // 4. Функція фільтрації
  function applyFilter(value) {
    const cards = document.querySelectorAll('[data-construction-card]');
    cards.forEach(card => {
      let isShow = true;
      Object.entries(value).forEach(([key, val]) => {
        const cardValue = card.dataset[key];
        if (cardValue != val) {
          isShow = false;
        }
      });
      card.style.display = isShow ? '' : 'none';
    });

    // Прокрутка до початку та оновлення слайдера
    slider.slideTo(0);
    slider.update();
  }
}

constructionFilterHandler(constructionSlider);

popupFormPlanning();

function formSuccessHandler() {
  const [formSuccess, setFormSuccess, subscribeFormSuccess] = useState(false);
  window.addEventListener('formSuccess', () => {
    setFormSuccess(true);
  });
  const popup = document.querySelector('[data-form-success-popup]');
  document.body.addEventListener('click', function successPopupOpen(evt) {
    const target = evt.target.closest('[data-form-success-popup-open]');
    if (!target) {
      return;
    }
    setFormSuccess(true);
  });

  document.body.addEventListener('click', function successPopupClose(evt) {
    const target = evt.target.closest('[data-form-success-popup-close]');
    if (!target) {
      return;
    }
    setFormSuccess(false);
  });

  subscribeFormSuccess(value => {
    if (value) {
      popup.classList.add('active');
      document.body.classList.add('popup-open');
      window.dispatchEvent(new Event('resize-me'));
    } else {
      popup.classList.remove('active');
      document.body.classList.remove('popup-open');
    }
  });
}
formSuccessHandler();

function callbackPopupHandler() {
  const [formSuccess, setFormSuccess, subscribeFormSuccess] = useState(false);
  const popup = document.querySelector('[data-callback-popup]');
  document.body.addEventListener('click', function successPopupOpen(evt) {
    const target = evt.target.closest('[data-callback-popup-open]');
    if (!target) {
      return;
    }
    setFormSuccess(true);
  });

  document.body.addEventListener('click', function successPopupClose(evt) {
    const target = evt.target.closest('[data-callback-popup-close]');
    if (!target) {
      return;
    }
    setFormSuccess(false);
  });

  subscribeFormSuccess(value => {
    if (value) {
      popup.classList.add('active');
      document.body.classList.add('popup-open');
      window.dispatchEvent(new Event('resize-me'));
    } else {
      popup.classList.remove('active');
      document.body.classList.remove('popup-open');
    }
  });
}

callbackPopupHandler();

function mobileNewsHandler() {
  if (window.screen.width > 767) {
    return;
  }
  const hiddenNews = document.querySelectorAll('[data-news-hidden-on-mobile]');

  //data-news-hidden-on-mobile
  //data-news-reveal-mobile

  hiddenNews.forEach(el => {
    el.style.display = 'none';
  });

  document.querySelectorAll('[data-news-reveal-mobile]').forEach(el => {
    el.addEventListener('click', evt => {
      hiddenNews.forEach(el => {
        el.style.display = '';
      });
      el.remove();
    });
  });
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
      },
    },
  });
}
documentsSlider();

const swiperFlat = new Swiper('.swiper-flats', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: '[data-flats-slider-next]',
    prevEl: '[data-flats-slider-prev]',
  },
});
