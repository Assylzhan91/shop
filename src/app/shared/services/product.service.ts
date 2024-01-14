import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

import {
  AddProductFormInterface,
  ProductResponseWithId,
  ResponseAddProductInterface,
  ResponseProductInterface
} from "@models";
import {CommonService} from "@shared";
import {dev} from "@environments";

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CommonService{
  private env = dev
  constructor() {
    super()
  }

  createProduct(product: AddProductFormInterface): Observable<ResponseProductInterface> {
    return this.http
        .post<ResponseAddProductInterface>(`${this.env.environment.firebase.fbDb}/products.json`, product)
        .pipe(
          map(
            (res: ResponseAddProductInterface) => ({
              ...product,
              id: res.name,
              date: new Date(product.date)
            })
          )
      )
  }

  getAllProducts(): Observable<ProductResponseWithId[]>{
    return this.http
      .get<Record<string, AddProductFormInterface>>(`${this.env.environment.firebase.fbDb}/products.json`)
      .pipe(
        map((res: Record<string, AddProductFormInterface>)=> {
          return Object.keys(res).map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
        }))
    }))
  }

  getProductById(id: string): Observable<ProductResponseWithId>{
    return this.http
      .get<AddProductFormInterface>(`${this.env.environment.firebase.fbDb}/products/${id}.json`)
      .pipe( map((res: AddProductFormInterface) => ({...res, id, date: res.date})))
  }

  removeProductById(id: string):Observable<Object> {
    return this.http.delete(`${this.env.environment.firebase.fbDb}/products/${id}.json`)
  }

  updateProduct(product: ProductResponseWithId): Observable<Object>{
    return this.http.patch(`${this.env.environment.firebase.fbDb}/products/${product.id}.json`, product)
  }

}
