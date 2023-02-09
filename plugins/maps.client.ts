type MapWaiting = {
  canvas: HTMLElement;
  lat: number;
  lng: number;
};

export default defineNuxtPlugin(() => {
  let mapLoaded = true;
  let mapWaiting: MapWaiting | null = null;
  const config = useRuntimeConfig();

  addScript();

  function addScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsKey}&libraries=places&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  }

  function initMap() {
    mapLoaded = true;
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting;
      renderMap(canvas, lat, lng);
      mapWaiting = null;
    }
  }

  function showMap(canvas: HTMLElement, lat: number, lng: number) {
    if(mapLoaded) {
      renderMap(canvas, lat, lng);
    } else {
      mapWaiting = { canvas, lat, lng };
    }
  }

  function renderMap(canvas: HTMLElement, lat: number, lng: number) {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const mapElement = new window.google.maps.Map(canvas, mapOptions);
    const position = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({
      position,
    });
    marker.setMap(mapElement);
  }

  return {
    provide: {
      showMap,
    }
  }
});
