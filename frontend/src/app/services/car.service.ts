import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private ajax: AjaxService) { }
  getAllCar() {
    return this.ajax.get('cars/get');
  }
}
