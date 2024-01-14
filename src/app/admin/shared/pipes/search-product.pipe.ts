import { Pipe, PipeTransform } from '@angular/core';
import {ProductResponseWithId} from "@models";

@Pipe({
  name: 'searchProduct',
  standalone: true
})
export class SearchProductPipe implements PipeTransform {

  transform(products: ProductResponseWithId[], product: string = ''): ProductResponseWithId[] {
    if(!product.trim()) {
      return  products
    }

    return products.filter((productName)=> {
      return productName.title.toLowerCase().includes(product.toLowerCase())
    });
  }

}
