import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'

import { NewsArticle } from '../model';

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
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code']
    const url = `http://newsapi.org/v2/top-headlines/`
    const headers = 'b66ccfb3ca484c7da4fffe2695578336'
    let params = (new HttpParams()).set('country', this.code).set('apiKey',headers)
    this.http.get<any>(url, {params: params}).toPromise()
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
            // cacheTime:  Date;
            // saved: boolean;
          } as NewsArticle
        })
        console.info(this.articleResults)
      })
  }

}
