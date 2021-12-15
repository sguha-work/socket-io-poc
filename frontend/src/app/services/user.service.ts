import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userLocalStorage: string = 'bidwiser_user';
  constructor(private ajax: AjaxService) { }
  public isUserLoggedIn(): boolean {
    if (typeof localStorage['bidwiser_user'] !== 'undefined' && localStorage['bidwiser_user'] !== '') {
      return true;
    } else {
      return false;
    }
  }
  public getUserInfo() {
    return localStorage[this.userLocalStorage];
  }
  public login(body: any) {
    return this.ajax.post('users/login', body);
  }
  public setUserNameToLocalStorage(userName: string) {
    localStorage[this.userLocalStorage] = userName;
  }
}
