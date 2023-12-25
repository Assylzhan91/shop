import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

import {AddProductFormInterface, ResponseAddProductInterface, ResponseProductInterface} from "@models";
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

  create(product: AddProductFormInterface): Observable<ResponseProductInterface> {
    return this
      .http
      .post<ResponseAddProductInterface>(`${this.env.environment.firebase.fbDb}/products.json`, product)
      .pipe(
        map((res: ResponseAddProductInterface) => ({
          ...product,
          id: res.name,
          date: new Date(product.dataAdd)
        }))
      )
  }
}
