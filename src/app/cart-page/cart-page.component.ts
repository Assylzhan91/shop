import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {PRODUCT_SERVICE} from "@tokens";
import {ProductResponseWithId} from "@models";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  productService = inject(PRODUCT_SERVICE)
  cartProducts: ProductResponseWithId[] = this.productService.cartProducts
  totalPrice: number = this.cartProducts.reduce<number>((prev, curr) => prev += +curr.price,  0)
}
