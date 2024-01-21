import {inject, InjectionToken} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";

import {AuthService, ProductService, OrderService} from "@shared";
import {OrderPaymentWithId, ProductResponseWithId, ResponseAllListInterface} from "@models";
import {HttpClient} from "@angular/common/http";
import { dev } from "@environments";

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE')
export const PRODUCT_SERVICE = new InjectionToken<ProductService>('PRODUCT_SERVICE')
export const ORDER_SERVICE = new InjectionToken<OrderService>('ORDER_SERVICE')

export const CART_PRODUCTS = new InjectionToken<BehaviorSubject<ProductResponseWithId[]>>('Cart products')

export const GET_ALL_LIST = new InjectionToken<Observable<OrderPaymentWithId>>('GET_ALL_LIST'
/*  , {
  factory: <T, R extends ResponseAllListInterface>(link: string)=> getAllListFactory<T, R>(link),
  providedIn: 'root'
}*/
)


function getAllListFactory<T, R extends ResponseAllListInterface>(link: string): Observable<T[]>{
  const http = inject(HttpClient)
  return http.get<Record<string, R>>(`${dev.environment.firebase.fbDb}/${link}.json`)
    .pipe(
      map((res: Record<string, R>)=> {
        return Object.keys(res).map( key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }) as T)
      }))
}
