import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { ApiKey, CountryList, NewsArticle } from './model';

@Injectable({
    providedIn: 'root'
})
export class apikeyDB extends Dexie {

    private apiKey: Dexie.Table<ApiKey, string>
    private countries: Dexie.Table<CountryList, string>
    private news: Dexie.Table<NewsArticle, string>

    constructor() {

        super('APIKEY')

        this.version(1).stores({
            apiKey: 'id',
            countries: 'code',
            news: 'pubTime, code'
        })

        this.apiKey = this.table('apiKey')
        this.countries = this.table('countries')
        this.news = this.table('news')
    }

    saveApi(id: string, apikey: string): Promise<any> {
        console.info('in DB  :', apikey)
        return this.apiKey.add( {id, apikey} )
    }

    getApiKey(id: string): Promise<string> {
        return this.apiKey.get(id).then(r => {
            if (!!r)
                return r.apikey
            return ''
        })
    }
    // async getApiKey(key: number): Promise<ApiKey> {
    //     return await this.apiKey.get(key)
    // }

    deleteApiKey(id: string): Promise<void> {
        return this.apiKey.delete(id)
    }

    checkContent(): Promise<any> {
        // const have = await this.apiKey.count()
        // if (have > 0) {
        //     console.info('count > 0')
        //     return have
        // } else {
        //     console.info('count < 0')
        //     return ('no')
        // }
        return this.apiKey.count()
    }

}