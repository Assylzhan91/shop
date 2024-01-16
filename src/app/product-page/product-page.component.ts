import {ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { switchMap} from "rxjs";

import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent extends ProductComponent{
  route = inject(ActivatedRoute)
  product$ = this.route.params.pipe(switchMap((params: Params | {id: string})=>this.productService.getProductById(params.id)))

}
