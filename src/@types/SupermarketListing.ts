export interface Location {
    street: string,
    number: number,
    district: string,
    zip: string,
    country: string,
    city: string,
    state: string
};

export interface SupermarketListing {
    _id: number,
    name: string,
    mainImage: string,
    additionalImages?: string[],
    location: Location,
    description: string,
    phone: string
};

export interface RequestResult {
    success: boolean,
    result: Array<SupermarketListing>
}

export interface SingleRequestResult {
    success: boolean,
    result: SupermarketListing
}