import { AlgoliaResponse } from "./algolia";

export interface UserResponse extends AlgoliaResponse {
    hits:                User[];
}

export interface User {
    joined:      string;
    name:        string;
    image:       string;
    reviewCount: number;
    description: string;
    homeId:      string[];
    objectID:    string;
}
