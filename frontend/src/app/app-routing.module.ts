import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarGalleryGqlComponent } from './components/car-gallery-gql/car-gallery-gql.component';
import { CarGalleryComponent } from './components/car-gallery/car-gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'login', component: LoginComponent},
  {path:'gallery', component: CarGalleryComponent},
  {path:'car/:id', component: CarDetailsComponent},
  {path:'gallerygql', component: CarGalleryGqlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
