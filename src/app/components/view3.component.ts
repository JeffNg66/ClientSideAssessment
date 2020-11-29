import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { NewsArticle } from '../model';
import { apikeyDB } from './../apikey.db';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {

  code = ''
  articleResults: NewsArticle[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, private qDB: apikeyDB,
  ) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code']
    const url = `http://newsapi.org/v2/top-headlines/`
    this.qDB.getApiKey('newsapi.org').then(res => {
      const params = (new HttpParams()).set('country', this.code)
      const headers = (new HttpHeaders()).set('X-Api-Key', res)

      this.http.get<any>(url, { params, headers }).toPromise()
        .then(resp => {
          const results = resp['articles'] as any[]
          // console.info(results)
          this.articleResults = results.map(r => {
            return {
              // id?: number;
              source: r.source.name,
              author: r.author,
              title: r.title,
              description: r.description,
              url: r.url,
              image: r.urlToImage,
              pubTime: r.publishedAt,
              content: r.content,
              // cacheTime:  new Date(),
              // saved: boolean,
            } as NewsArticle
          })
          console.info(this.articleResults)
        })
    })
  }

}
