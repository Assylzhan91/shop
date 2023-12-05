import {InjectionToken} from "@angular/core";

import {AuthService} from "@shared";

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE')
