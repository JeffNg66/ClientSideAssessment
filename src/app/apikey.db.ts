import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { ApiKey, CountryList, NewsArticle } from './model';

@Injectable({
    providedIn: 'root'
})
export class apikeyDB extends Dexie {

    private apiKey: Dexie.Table<ApiKey, string>
    private country: Dexie.Table<CountryList, string>
    private news: Dexie.Table<NewsArticle, string>

    constructor() {

        super('APIKEY')

        this.version(1).stores({
            apiKey: '++id, apiKey'
        })

        this.version(1).stores({
            country: 'id, country, flag'
        })

        this.version(1).stores({
            news: 'id, title, link'
        })

        this.apiKey = this.table('apiKey')
        this.country = this.table('country')
        this.news = this.table('news')
    }

    async saveApi(key: ApiKey): Promise<any> {
        console.info('in DB  :',key)
        return await this.apiKey.add(key)
    }

    // async getApiKey(key: number): Promise<ApiKey> {
    //     return await this.apiKey.get(key)
    // }

    async deleteApiKey(): Promise<any> {
        return await this.apiKey.clear()
    }

    async checkContent(): Promise<any> {
        // const have = await this.apiKey.count()
        // if (have > 0) {
        //     console.info('count > 0')
        //     return have
        // } else {
        //     console.info('count < 0')
        //     return ('no')
        // }
        return await this.apiKey.count()
    }

}