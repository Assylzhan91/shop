import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";

import {AuthResponseInterface, UserInterface} from "@models";
import {CommonService} from "@shared";
import {dev} from "@environments";

const  localStorageDate  = {
  FbTokenExp: 'fb-token',
  FbToken: 'fb-token',
} as const

@Injectable({
  providedIn: 'root'
})
export class AuthService extends  CommonService{
  private env = dev

  constructor() {
    super()
  }

  public login(user: UserInterface): Observable<AuthResponseInterface> {
    const { firebase } =  this.env.environment;
    return this.http
      .post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase.apiKey}`, user)
      .pipe(
        tap((res)=> res ? this.setToken(res) : this.setToken(null))
      )
  }

  public  setToken(response: AuthResponseInterface | null): void {
    if  (response && response.expiresIn) {
      let expData: Date =  new Date( new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
      return;
    }
    localStorage.clear()
  }

  public get getToken(): string | null {
    let expDate = new Date(localStorage.getItem(localStorageDate.FbTokenExp) as string).getTime(),
        currentDate = new Date().getTime();
    if (currentDate > expDate) {
      this.logout()
      return null;
    }
    return localStorage.getItem(localStorageDate.FbToken)
  }

  public  logout(): void {
    this.setToken(null)
    this.router.navigate(['/admin', 'login'])
  }

  public  isAuthenticated(): boolean {
    return !!this.getToken
  }
}
