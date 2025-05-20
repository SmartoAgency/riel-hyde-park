export default function mapStyle() {
  return [
    [
      { elementType: 'geometry', stylers: [{ color: '#002E52' }] },
      { elementType: 'labels.text.fill', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#1D4A9E' }, { weight: 3 }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#002E52' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#002E52' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#006FD3' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  ];
}
