import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { NewsArticle } from '../model';
import { newsappDB } from './../newsapp.db';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})
export class View3Component implements OnInit {

  code = ''
  country = ''
  articleResults: NewsArticle[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, private qDB: newsappDB,
  ) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code']
    this.country = this.activatedRoute.snapshot.params['country']
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
