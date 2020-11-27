import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { apikeyDB } from './apikey.db';
import { View1Component } from './components/view1.component';
import { View2Component } from './components/view2.component';
import { View3Component } from './components/view3.component';

// configure all the routes/views
const ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'view1', component: View1Component },
  { path: 'view2', component: View2Component },
  { path: 'view3/:code', component: View3Component },
  // { path: 'search/:genre/:q', component: ResultComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }  // match the whole path not just routes
]

@NgModule({
  declarations: [
    AppComponent,
    View2Component,
    View1Component,
    View3Component,
  ],
  imports: [
  BrowserModule,
  FormsModule, ReactiveFormsModule,
  RouterModule.forRoot(ROUTES),
  HttpClientModule,
  // HttpClient,
  ],
  providers: [
              apikeyDB,
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
