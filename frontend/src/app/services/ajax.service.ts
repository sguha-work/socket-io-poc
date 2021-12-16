import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  // private urlEndPoint: string = 'http://localhost:3000/';
  private urlEndPoint: string = environment.apiURL;

  // location = window.location;
  // private urlEndPoint: string = `http://${this.location.hostname}:${this.location.port ? this.location.port : ''}/`;

  constructor(private httpObj: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    //'users/register'
    return this.httpObj.post(this.urlEndPoint + url, body, {
      observe: 'body'
    });
  }
  get(url: string, data?: String): Observable<any> {
    if (typeof data === 'undefined') {
      return this.httpObj.get(this.urlEndPoint + url);
    } else {
      let query: any = {
        _id: data
      };
      return this.httpObj.get(this.urlEndPoint + url, { params: query });
    }
  }
}
