export interface Place {
    'place name': string;
    state: string;
    latitude: string;
    longitude: string;
}

export interface PostalData {
    'post code': string;
    country: string;
    places: Place[];
}
