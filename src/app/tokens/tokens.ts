import {InjectionToken} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {AuthService, ProductService, OrderService} from "@shared";
import {ProductResponseWithId} from "@models";

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE')
export const PRODUCT_SERVICE = new InjectionToken<ProductService>('PRODUCT_SERVICE')
export const ORDER_SERVICE = new InjectionToken<OrderService>('ORDER_SERVICE')

export const CART_PRODUCTS = new InjectionToken<BehaviorSubject<ProductResponseWithId[]>>('Cart products')
