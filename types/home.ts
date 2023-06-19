import { AlgoliaResponse } from "./algolia";

export interface HomeSearchResponse extends AlgoliaResponse {
    hits:                Home[];
}

export interface Home {
    type:          string;
    title:         string;
    description:   string;
    note:          string;
    reviewCount:   number;
    reviewValue:   number;
    features:      string[];
    pricePerNight: number;
    location:      Location;
    guests:        number;
    bedrooms:      number;
    beds:          number;
    bathrooms:     number;
    images:        string[];
    _geoloc:       Geoloc;
    objectID:      string;
}

export interface HomeMarker {
    lat: number;
    lng: number;
    id: string;
    pricePerNight: number;
}

interface Geoloc {
    lat: number;
    lng: number;
}

interface Location {
    address: string;
    city:    string;
    state:   string;
    country: string;
}

