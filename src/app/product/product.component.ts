import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuillViewComponent} from "ngx-quill";
import {RouterLink} from "@angular/router";

import {ProductResponseWithId} from "@models";
import {PRODUCT_SERVICE} from "@tokens";

@Component({
  selector: 'shop-product',
  standalone: true,
  imports: [CommonModule, QuillViewComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input({required: true}) product!: ProductResponseWithId

  productService = inject(PRODUCT_SERVICE)

  addProductCart = (product: ProductResponseWithId)=> this.productService.addCartProduct(product)
}
