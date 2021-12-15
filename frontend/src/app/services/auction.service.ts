import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxService } from './ajax.service';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private ajax: AjaxService) { }
  addAuctionEntry(data: any): Observable<any> {
    return this.ajax.post('auction/add', data);
  }
}
