import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PRODUCT_SERVICE} from "@tokens";
import {Observable} from "rxjs";
import {ProductResponseWithId} from "@models";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  productService = inject(PRODUCT_SERVICE)
  allProducts$:Observable<ProductResponseWithId[]> = this.productService.getAllProducts()
}
