import { Pipe, PipeTransform } from '@angular/core';
import {ProductResponseWithId, ProductTypes} from "@models";

@Pipe({
  name: 'sortingProducts',
  standalone: true
})
export class SortingProductsPipe implements PipeTransform {

  transform(products: ProductResponseWithId[], productType: ProductTypes = 'Phone'): ProductResponseWithId[] {
    return products.filter((productName)=> productName.type === productType);
  }

}
