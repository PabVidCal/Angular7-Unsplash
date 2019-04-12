import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Global } from './providers/global';
import {Routes, RouterModule} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { GalleryComponent } from './gallery/gallery.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: AppComponent }
 ];
 

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    LightboxModule,
    InfiniteScrollModule,
    NgbModule
  ],
  entryComponents: [

  ],
  providers: [BrowserModule,
    HttpClientModule,
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
