import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import { Subject, takeUntil} from "rxjs";

import { OrderPaymentWithId } from "@models";
import { ORDER_SERVICE } from "@tokens";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {
  productService = inject(ORDER_SERVICE)

  cdf = inject(ChangeDetectorRef)
  orders: OrderPaymentWithId[] = []
  unsubscribe = new Subject<void>()
  searchProductName: string = ''

  ngOnInit(): void {

    this.productService.getAllOrderProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((orders: OrderPaymentWithId[])=> {
        this.orders = orders
        this.cdf.markForCheck()
      })
  }

  removeProductById(id: string): void{
    this.productService.removeOrderById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(()=> {
        this.orders = this.orders.filter(order =>order.id !== id)
        this.cdf.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
