import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

import {
  AddProductFormInterface,
  GetAllProductsInterface,
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
              date: new Date(product.dataAdd)
            })
          )
      )
  }

  getAllProducts(): Observable<GetAllProductsInterface[]>{
      return this.http
        .get<Record<string, AddProductFormInterface>>(`${this.env.environment.firebase.fbDb}/products.json`)
        .pipe(
          map((res: Record<string, AddProductFormInterface>)=> {
            return Object.keys(res).map( key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].dataAdd)
            }))
        }))
  }

}
