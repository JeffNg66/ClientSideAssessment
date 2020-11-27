import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiKey } from './../model';
import { apikeyDB } from './../apikey.db';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit {

  form: FormGroup
  apiKey: string = ''

  // constructor(private fb: FormBuilder, ) { }
  constructor(private fb: FormBuilder, private qDB: apikeyDB, private router: Router) { }

  ngOnInit(): void {

    this.form = this.createApi()
    
    // retrieve apikey from database for user to delete

    // this.qDB.apiKey.get(1)
    //   .then(res => { 
    //     this.apiKey = res.apikey  
    //     console.log(this.apiKey)
    // })
  }

  async delkey() {
    await this.qDB.deleteApiKey()
    this.router.navigate(['/view2'])  // user need to enter new api key
  }

  private createApi(): FormGroup {
    return this.fb.group({
      akey: this.fb.control('', [Validators.required]),
    })
  }

  async addkey() {
    const add: ApiKey = {
       apikey: this.form.get('akey').value
    }
    console.info('apikey  ', add)

    await this.qDB.saveApi(add)
  
   this.router.navigate(['/view1'])
  }

}
