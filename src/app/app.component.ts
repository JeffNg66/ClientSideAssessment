import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { apikeyDB } from './apikey.db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newsapi';

  check = 0;

  constructor(private router: Router, private apidb: apikeyDB) { }

  ngOnInit(): void {
    // search apikey from database
    // if exist goes to View 1 else View 2
    this.apidb.checkContent()
      .then(res => { this.check = res})
    console.info('checkContent', this.check)
    if (this.check) {
      this.router.navigate(['/view1'])
    } else {
      this.router.navigate(['/view2'])
    } 
  }

  // gotoView2() {
  //   this.router.navigate(['/view2'])
  // }
}
