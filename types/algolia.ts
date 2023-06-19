export interface Exhaustive {
    nbHits: boolean;
    typo:   boolean;
}

export interface ProcessingTimingsMS {
    request: Request;
    total:   number;
}

export interface Request {
    roundTrip: number;
}

export interface RenderingContent {
}

export interface Request {
    roundTrip: number;
}

export interface AlgoliaResponse {
    nbHits:              number;
    page:                number;
    nbPages:             number;
    hitsPerPage:         number;
    exhaustiveNbHits:    boolean;
    exhaustiveTypo:      boolean;
    exhaustive:          Exhaustive;
    query:               string;
    params:              string;
    renderingContent:    RenderingContent;
    processingTimeMS:    number;
    processingTimingsMS: ProcessingTimingsMS;
    serverTimeMS:        number;
}
