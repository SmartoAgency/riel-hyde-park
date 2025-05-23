// import { fetchMarkersData } from './getMarkers';

import mapStyle from './map-style';

const mapContainers = document.querySelectorAll('.map');
export default function googleMap() {
  // window.initMap = function initMap() {
  //   mapContainers.forEach((mapElement, index) => {
  //     // ...
  //   });
  // };

  async function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      let key = '';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      window.initMap = () => resolve();
      document.head.appendChild(script);
    });
  }

  // const mapContainers = document.querySelectorAll('.map');
  console.log(mapContainers);
  const observerOptions = {
    rootMargin: '0px',
    threshold: 0.1,
  };

  mapContainers.forEach(container => {
    const observer = new IntersectionObserver(async (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          obs.unobserve(container);
          await loadGoogleMapsScript();
          createMap(container);
        }
      }
    }, observerOptions);

    observer.observe(container);

    // 🔽 Додаткова перевірка – чи вже елемент видимий при завантаженні
    if (isElementInViewport(container)) {
      observer.unobserve(container); // на випадок, якщо буде дублювання
      loadGoogleMapsScript().then(() => createMap(container));
    }
  });

  // 👇 Допоміжна функція
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function createMap(container) {
    const gmarkers = [];
    const center = {
      lat: 49.839702,
      lng: 24.0609219,
    };

    const choosedCategories = new Set();
    choosedCategories.add('main');

    const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(container, {
      zoom: 16,
      center,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      language: 'ua',
      styles: mapStyle(),
    });

    const filterMarkers = function(categoriesArray) {
      gmarkers.forEach(el => {
        if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
          el.setMap(map);
          el.setAnimation(google.maps.Animation.DROP);
        } else {
          el.setMap(null);
        }
      });
    };

    filterItems.forEach(item => {
      item.addEventListener('click', evt => {
        evt.stopImmediatePropagation();
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
          choosedCategories.add(item.dataset.category);
        } else {
          choosedCategories.delete(item.dataset.category);
        }
        filterMarkers(choosedCategories);
      });
    });

    const baseFolder = window.location.href.match(/localhost/)
      ? './assets/images/map/'
      : '/wp-content/themes/3d/assets/images/map/';
    const defaultMarkerSize =
      document.documentElement.clientWidth < 1600
        ? new google.maps.Size(36, 70)
        : new google.maps.Size(42, 80);
    const buildLogoSize = new google.maps.Size(82, 82);

    const markersAdresses = {
      main: `${baseFolder}main.svg`,
      mall: `${baseFolder}mall.svg`,
      park: `${baseFolder}park.svg`,
      garden: `${baseFolder}garden.svg`,
      nature: `${baseFolder}nature.svg`,
      activities: `${baseFolder}activities.svg`,
      pharmacy: `${baseFolder}pharmacy.svg`,
      restaurant: `${baseFolder}restaurant.svg`,
      school: `${baseFolder}school.svg`,
      sport: `${baseFolder}sport.svg`,
      supermarket: `${baseFolder}supermarket.svg`,
      drivingSchool: `${baseFolder}driving-school.svg`,
      post: `${baseFolder}post.svg`,
      aquapark: `${baseFolder}aquapark.svg`,
      petrolStation: `${baseFolder}petrol-station.svg`,
      busStop: `${baseFolder}bus-stop.svg`,
      carWashing: `${baseFolder}car-washing.svg`,
    };

    const markersData = [
      {
        type: 'school',
        icon: {
          url: markersAdresses.school,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8411438, lng: 24.0670208 },
        text: 'Школа №70',
      },
      {
        type: 'school',
        icon: {
          url: markersAdresses.school,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.837203, lng: 24.0629459 },
        text: 'Школа №63',
      },

      {
        type: 'pharmacy',
        icon: {
          url: markersAdresses.pharmacy,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8383945, lng: 24.057029 },
        text: 'Амбулаторія сімейної медицини КНП "1-а міська поліклініка м.Львова"',
      },
      {
        type: 'pharmacy',
        icon: {
          url: markersAdresses.pharmacy,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8383982, lng: 24.0560681 },
        text: 'Аптека 3І',
      },
      {
        type: 'garden',
        icon: {
          url: markersAdresses.garden,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8397878, lng: 24.0584562 },
        text: 'Дитячий садок №132',
      },

      {
        type: 'restaurant',
        icon: {
          url: markersAdresses.restaurant,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8381391, lng: 24.0584291 },
        text: 'Кінотеатр ім. Миколайчука',
      },
      {
        type: 'restaurant',
        icon: {
          url: markersAdresses.restaurant,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8374302, lng: 24.0605258 },
        text: 'Ресторан «Роден»',
      },

      {
        type: 'nature',
        icon: {
          url: markersAdresses.nature,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8412704, lng: 24.0603914 },
        text: 'Парк «Шевченківський Гай»',
      },
      {
        type: 'supermarket',
        icon: {
          url: markersAdresses.supermarket,
          scaledSize: defaultMarkerSize,
        },
        position: { lat: 49.8371949, lng: 24.0617739 },
        text: '"Близенько"',
      },
      {
        type: 'main',
        icon: {
          url: markersAdresses.main,
          scaledSize: buildLogoSize,
        },
        position: { lat: 49.839702, lng: 24.0609219 },
        text: 'Hyde Park вул. Мучна, 32',
      },
    ];

    const infowindow = new google.maps.InfoWindow({
      maxWidth: 300,
    });
    markersData.forEach(marker => {
      const mapMarker = new google.maps.Marker({
        map,
        category: marker.type,
        animation: google.maps.Animation.DROP,
        zIndex: marker.zIndex || 1,
        icon: marker.icon,
        cursor: 'grab',
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });

      google.maps.event.addListener(mapMarker, 'click', function() {
        infowindow.setContent(marker.text);
        infowindow.open(map, mapMarker);
        map.panTo(this.getPosition());
      });

      mapMarker.name = marker.type;
      gmarkers.push(mapMarker);
    });
  }

  const mapSingle = document.querySelector('.map-simple');
  console.log(mapSingle);
  if (mapSingle) {
    (async () => {
      console.log(mapSingle);
      await loadGoogleMapsScript();
      console.log(mapSingle);
      const singleMapCenter = { lat: 49.8541054, lng: 24.0444017 };
      const singleMapZoom = 15;
      const singleMapText = 'Відділ продажів';

      const singleMap = new google.maps.Map(mapSingle, {
        zoom: singleMapZoom,
        center: singleMapCenter,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        styles: mapStyle(),
      });

      const singleMarkerIcon = {
        url: `${
          window.location.href.match(/localhost/)
            ? './assets/images/map/main.png'
            : '/wp-content/themes/3d/assets/images/map/main.svg'
        }`,
        scaledSize:
          document.documentElement.clientWidth < 1600
            ? new google.maps.Size(80, 80)
            : new google.maps.Size(90, 90),
      };

      const singleMarker = new google.maps.Marker({
        position: singleMapCenter,
        map: singleMap,
        icon: singleMarkerIcon,
        animation: google.maps.Animation.DROP,
      });

      const singleInfoWindow = new google.maps.InfoWindow({
        content: singleMapText,
        maxWidth: 300,
      });

      singleMarker.addListener('click', function() {
        singleInfoWindow.open(singleMap, singleMarker);
        singleMap.panTo(singleMarker.getPosition());
      });
    })();
  }
}
