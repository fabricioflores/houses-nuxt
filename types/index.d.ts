export {};

declare global {
  interface Window {
    initGoogleMaps: Function;
    google: google.maps,
  }
}
