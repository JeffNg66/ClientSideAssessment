import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { ApiKey, CountryList, NewsArticle } from './model';

@Injectable({
    providedIn: 'root'
})
export class newsappDB extends Dexie {

    private apiKey: Dexie.Table<ApiKey, string>
    private countries: Dexie.Table<CountryList, string>
    private news: Dexie.Table<NewsArticle, string>

    constructor() {

        super('NEWSAPI')

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
        return this.apiKey.add( {id, apikey} )
    }

    getApiKey(id: string): Promise<string> {
        return this.apiKey.get(id).then(r => {
            if (!!r)
                return r.apikey
            return ''
        })
    }

    deleteApiKey(id: string): Promise<void> {
        return this.apiKey.delete(id)
    }

    checkContent(): Promise<any> {
        return this.apiKey.count()
    }

    saveCountryList(list: CountryList[]): Promise<any> {
        // console.info('befor DB bulkput   ',list)
        return this.countries.bulkPut(list)
    }

    getCountryList(): Promise<CountryList[]> {
        return this.countries.toArray()
    }

    getCountry(code: string): Promise<CountryList> {
        return this.countries.where('code').equalsIgnoreCase(code)
            .toArray()
            .then(result => {
                if (result.length > 0)
                    return result[0]
                return null
            })
    }

}