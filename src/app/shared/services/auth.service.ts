import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

import {environment} from "../../../environments/environments";
import {AuthResponseInterface, UserInterface} from "@models";

const  localStorageDate  = {
  FbTokenExp: 'fb-token',
  FbToken: 'fb-token',
} as const

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)

  constructor() { }

  login(user: UserInterface): Observable<AuthResponseInterface> {
    const { firebase } =  environment;
    return this.http
      .post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase.apiKey}`, user)
      .pipe(
        tap((res)=> res ? this.setToken(res) : this.setToken(null))
      )
  }

  setToken(response: AuthResponseInterface | null): void {
    if  (response && response.expiresIn) {
      let expData: Date =  new Date( new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
      return;
    }
    localStorage.clear()
  }

  getToken(): string | null {
    let expDate = new Date(localStorage.getItem(localStorageDate.FbTokenExp) as string).getTime(),
        currentDate = new Date().getTime();
    if (currentDate > expDate) {
      this.logout()
      return null;
    }
    return localStorage.getItem(localStorageDate.FbToken)
  }

  logout(): void {
    this.setToken(null)
    this.router.navigate(['/admin', 'login'])
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
