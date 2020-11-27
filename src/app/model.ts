export interface ApiKey {
    id?: number
    apikey: string;
}

export interface CountryList {
    country: string;
    code: string;
    flag: string;
}

export interface NewsArticle {
    id?: number;
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    image: string;
    pubTime: Date;
    content: string;
    cacheTime?:  Date;
    saved?: boolean;
}