import {inject, Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {UserInterface} from "@models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private angularFireAuth = inject(AngularFireAuth)
  constructor() { }

  login(user: UserInterface) {
    return this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
  }
}
