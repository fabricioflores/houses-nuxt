import { AlgoliaResponse } from "./algolia";

export interface ReviewResponse extends AlgoliaResponse {
    hits:                Review[];
}

export interface Review {
    homeId:   string;
    reviewer: Reviewer;
    rating:   number;
    date:     string;
    comment:  string;
    objectID: string;
}

export interface Reviewer {
    image: string;
    name:  string;
}
