import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiKey } from './../model';
import { apikeyDB } from './../apikey.db';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit, OnChanges {

  form: FormGroup = this.createApi()
  apiKey: string = ''
  NEWS_API = 'newsapi.org'
  keysaved: boolean = false

  // constructor(private fb: FormBuilder, ) { }
  constructor(private fb: FormBuilder, private qDB: apikeyDB, private router: Router) { }

  ngOnInit(): void {
    this.qDB.getApiKey(this.NEWS_API)
      .then(res => {
        this.apiKey = res
        if (!!res) {
          this.keysaved = true
          console.info('retrieve    ', res)
          console.info('keysaved:   ', this.keysaved)
          this.form = this.createApi(res)
        } else {
          this.keysaved = false
          this.form = this.createApi()
        }
      })

    console.info("I am here")
    // // retrieve apikey from database for user to delete
    // this.qDB.getApiKey()
    //   .then(res => {
    //     this.apiKey = res.apikey
    //     console.info('retrieve    ',this.apiKey)
    //     this.form.patchValue('akey')
    //   })
    // this.qDB.apiKey.get(1)
    //   .then(res => { 
    //     this.apiKey = res.apikey  
    //     console.log(this.apiKey)
    // })
  }

  ngOnChanges(): void {
    // this.qDB.getApiKey()
    //   .then(res => {
    //     this.apiKey = res.apikey
    //     console.info('retrieve    ', res)
    //     this.form = this.createApi(res)
    //   })
  }


  async delkey() {
    await this.qDB.deleteApiKey(this.NEWS_API).then(() => {
      this.form.reset()
      this.keysaved = false
      this.router.navigate(['/view2'])  // user need to enter new api key
    })
  }

  private createApi(key: string = ''): FormGroup {
    return this.fb.group({
      akey: this.fb.control(key, [Validators.required]),
    })
  }

  async addkey() {
    const add: string = this.form.get('akey').value
    // const add = {
    //   apikey: this.form.get('akey').value
    // }
    console.info('apikey  ', add)

    await this.qDB.saveApi(this.NEWS_API, add).then(() => {
      this.keysaved = true
      this.router.navigate(['/view1'])
    })

  }

}
