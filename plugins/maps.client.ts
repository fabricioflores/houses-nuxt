export default defineNuxtPlugin(() => {
  let isLoaded = true;
  // TODO: type this
  let waiting = [] as any[];
  const config = useRuntimeConfig();

  addScript();

  function addScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    window.initGoogleMaps = initGoogleMaps;
    document.head.appendChild(script);
  }

  function initGoogleMaps() {
    isLoaded = true;
    waiting.forEach((item) => {
      if(typeof item.fn === 'function') {
        item.fn(...item.arguments);
      }
    });
    waiting = [];
  }

  function makeAutocomplete(input: HTMLInputElement | null) {
    if(!input) {
      return;
    }

    if(!isLoaded) {
      waiting.push({
        fn: makeAutocomplete,
        arguments,
      });
      return;
    }
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      input.dispatchEvent(new CustomEvent('changed', { detail: place } ));
    });
  }

  function showMap(canvas: HTMLElement, lat: number, lng: number) {
    if(!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      });
      return;
    }
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
      makeAutocomplete,
    }
  }
});
