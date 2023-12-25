import {InjectionToken} from "@angular/core";

import {AuthService, ProductService} from "@shared";

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE')
export const PRODUCT_SERVICE = new InjectionToken<ProductService>('PRODUCT_SERVICE')
