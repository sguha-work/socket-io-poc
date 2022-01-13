import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuctionComponent } from './components/auction/auction.component';
import { LoginComponent } from './components/login/login.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarGalleryComponent } from './components/car-gallery/car-gallery.component';
import { CarGalleryGqlComponent } from './components/car-gallery-gql/car-gallery-gql.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuctionComponent,
    LoginComponent,
    CarDetailsComponent,
    CarGalleryComponent,
    CarGalleryGqlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
