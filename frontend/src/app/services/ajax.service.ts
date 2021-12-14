import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  private urlEndPoint: string = 'http://localhost:3000/';
 constructor(private _http: HttpClient) { }

  post(url: string, body: any) {
    //'users/register'
    return this._http.post(this.urlEndPoint+url, body,{
      observe:'body'
    });
  }
}
