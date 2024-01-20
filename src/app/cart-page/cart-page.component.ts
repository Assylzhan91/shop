import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup} from "@angular/forms";

import {CART_PRODUCTS, ORDER_SERVICE, PRODUCT_SERVICE} from "@tokens";
import {
  ResponseAddProductInterface,
  CartProductFormValues,
  ProductResponseWithId,
  OrderPayment,
  PaymentMethod,
} from "@models";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent implements OnInit{
  productService = inject(PRODUCT_SERVICE)
  orderService = inject(ORDER_SERVICE)
  cartProducts = inject(CART_PRODUCTS)
  cdf = inject(ChangeDetectorRef)

  totalPrice: number = this.cartProducts.value.reduce<number>((prev, curr) => prev += +curr.price,  0)
  isSubmitted: boolean = false;

  cartProductForm!: FormGroup<CartProductFormValues<PaymentMethod>>

  ngOnInit() {
    this.cartProductForm = new UntypedFormGroup({
      name:  new FormControl('NANE some'),
      phone:  new FormControl('Table some asdas'),
      address:  new FormControl('address asdasd some'),
      payment:  new FormControl<PaymentMethod>(PaymentMethod.Cart),
    })
  }

  paymentProduct(): void {
    if(this.cartProductForm.invalid) {
      return;
    }
    this.isSubmitted = true

    const order: OrderPayment = <OrderPayment>{
      name: this.cartProductForm.value.name,
      phone: this.cartProductForm.value.phone,
      address: this.cartProductForm.value.address,
      payment: this.cartProductForm.value.payment,
      price: String( this.totalPrice),
      orders: this.cartProducts.value,
      date: new Date()
    }

    this.orderService
      .createOrder<ResponseAddProductInterface>(order)
      .subscribe({
        next: ()=> {
          this.isSubmitted = false
          this.cartProductForm.reset()
          this.cdf.detectChanges()
        }
      })
  }

  deleteProduct(product: ProductResponseWithId, i: number): void{
    this.totalPrice -= +product.price
    let filteredCartProducts =  this.cartProducts.value.filter((p, idx)=> idx !== i)
    this.cartProducts.next([...filteredCartProducts])
    this.cdf.detectChanges()
  }

  get getAddProductForm() {
    return this.cartProductForm.controls;
  }
}
