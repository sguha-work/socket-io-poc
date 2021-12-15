import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  private urlEndPoint: string = 'http://localhost:3000/';
 constructor(private httpObj: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    //'users/register'
    return this.httpObj.post(this.urlEndPoint+url, body,{
      observe:'body'
    });
  }
  get(url: string): Observable<any> {
    return this.httpObj.get(this.urlEndPoint+url);
  }
}
