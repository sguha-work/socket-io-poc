import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxService } from './ajax.service';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private ajax: AjaxService) { }
  getAllCar(): Observable<any>{
    return this.ajax.get('cars/get');
  }
  getCar(id: string):Observable<any> {
    return this.ajax.get('cars/get', id)
  }
}
