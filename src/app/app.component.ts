import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { newsappDB } from './newsapp.db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newsapi';

  constructor(private router: Router, private apidb: newsappDB) { }

  ngOnInit(): void {
    // search apikey from database
    // if exist goes to View 1 else View 2
    this.apidb.checkContent()
      .then(res => { 
        if (!!res) {
          this.router.navigate(['/view1'])
        } else {
          this.router.navigate(['/view2'])
        } 
      })
  }

  // gotoView2() {
  //   this.router.navigate(['/view2'])
  // }
}
