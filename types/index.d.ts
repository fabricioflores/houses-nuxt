export {};

declare global {
  interface Window {
    initMap: Function;
    google: google.maps,
  }
}
