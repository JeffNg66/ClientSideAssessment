import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { CountryList } from '../model';
import { newsappDB } from './../newsapp.db';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  resultList: CountryList[]

  constructor(
    private http: HttpClient,
    private cDB: newsappDB,
  ) { }

  ngOnInit(): void {
    // retrieve countrylist from database to resultList
    // 
    this.cDB.getCountryList().then(result => {
      if (result.length <= 0) {
        // if not exist, request by http and store in database
        // 
        // console.info('Get from restcountries')
        const url = 'https://restcountries.eu/rest/v2/alpha?codes='
        const countries = "ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za"
        const urls = url + countries
        // console.info(urls)
        this.http.get<any>(urls).toPromise()
          .then(resp => {
            const results = resp as any[]
            this.resultList = results.map(r => {
              return {
                country: r.name,
                code: r.alpha2Code,
                flag: r.flag
              } as CountryList
            })
            // console.info('>>>  ', this.resultList)
          })
          // store in database
          .then(() => {
            this.cDB.saveCountryList(this.resultList)
          })
      } else {
        // console.info('get from Database')
        this.resultList = result
      }
    })

  }

}