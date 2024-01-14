import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Subject, takeUntil } from "rxjs";

import {PRODUCT_SERVICE} from "@tokens";
import {ProductResponseWithId} from "@models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy{
  productService = inject(PRODUCT_SERVICE)
  cdf = inject(ChangeDetectorRef)
  products: ProductResponseWithId[] = []
  unsubscribe = new Subject<void>()
  searchProductName: string = ''

  ngOnInit(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((products: ProductResponseWithId[])=> {
        this.products = products
        this.cdf.markForCheck()
      })
  }

  removeProductById(id: string): void{
    this.productService.removeProductById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(()=> {
        this.products = this.products.filter(product =>product.id !== id)
        this.cdf.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
