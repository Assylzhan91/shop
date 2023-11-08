import {UserService} from "@services/user.service";
import {InjectionToken} from "@angular/core";

export const USER_SERVICE = new InjectionToken<UserService>('USER_SERVICE')
