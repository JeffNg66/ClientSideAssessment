export interface ApiKey {
    id?: string
    apikey: string;
}

export interface CountryList {
    code: string;
    country: string;
    flag: string;
}

export interface NewsArticle {
    pubTime: Date;
    code: string;
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    image: string;
    content: string;
    cacheTime?:  Date;
    saved?: boolean;
}