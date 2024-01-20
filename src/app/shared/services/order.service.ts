import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";

import {CommonService} from "@shared";
import { OrderPayment, ResponseAddProductInterface } from "@models";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends CommonService{

  constructor() {
    super()
  }

  createOrder<R extends ResponseAddProductInterface>(order: OrderPayment): Observable<OrderPayment> {
    return this.http
      .post<R>(`${this.env.environment.firebase.fbDb}/orders.json`, order)
      .pipe(
        map(
          (res: R) => ({
            ...order,
            id: res.name,
            date: new Date(order.date)
          })
        )
      )
  }

/*  getAllProducts(): Observable<ProductResponseWithId[]>{
    return this.http
      .get<Record<string, AddProductFormInterface>>(`${this.env.environment.firebase.fbDb}/products.json`)
      .pipe(
        map((res: Record<string, AddProductFormInterface>)=> {
          return Object.keys(res).map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
        })
      )
  }

  removeProductById(id: string):Observable<null> {
    return this.http.delete<null>(`${this.env.environment.firebase.fbDb}/products/${id}.json`)
  }*/
}
