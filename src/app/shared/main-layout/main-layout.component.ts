import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";

import { PRODUCT_SERVICE } from "@tokens";
import { productsNavigate, ProductTypes } from "@models";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  router = inject(Router)
  productService = inject(PRODUCT_SERVICE)
  defaultTypeProduct: ProductTypes = 'Phone'
  productsNavigate = productsNavigate

  setTypeProduct(typeProduct: ProductTypes): void {
    this.defaultTypeProduct = typeProduct
    if(this.defaultTypeProduct !== 'Cart'){
      this.router.navigate(['/'], {
        queryParams: {
          type: typeProduct.toLowerCase()
        }
      })
      this.productService.setTypeProduct(typeProduct)
    }
  }
}
