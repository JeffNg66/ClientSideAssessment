import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { ApiKey } from './model';

@Injectable({
    providedIn: 'root'
})
export class apikeyDB extends Dexie {

    private apiKey: Dexie.Table<ApiKey, string>

    constructor() {

        super('APIKEY')

        this.version(2).stores({
            apiKey: 'apiKey'
        })

        this.apiKey = this.table('apiKey')
    }

    async saveApi(key: ApiKey): Promise<any> {
        return await this.apiKey.put(key)
    }

    async getApiKey(key: string): Promise<ApiKey> {
        return await this.apiKey.get(key)
    }

    saveApiKey() {

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