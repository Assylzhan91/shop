import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {PRODUCT_SERVICE} from "@tokens";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit{
  productService = inject(PRODUCT_SERVICE)
  route = inject(ActivatedRoute)
  product$ = this.route.params.pipe(switchMap((params: Params | {id: string})=>this.productService.getProductById(params.id)))

  ngOnInit(): void {

  }
}
