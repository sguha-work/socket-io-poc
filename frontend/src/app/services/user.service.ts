import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public isUserLoggedIn(): boolean {
    if (typeof localStorage['bidwiser_user'] !== 'undefined' && localStorage['bidwiser_user'] !== '') {
      return true;
    } else {
      return false;
    }
  }
  public getUserInfo() {
    return JSON.parse(localStorage['bidwiser_user']);
  }
}
