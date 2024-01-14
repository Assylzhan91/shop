import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {Subject, switchMap, takeUntil} from "rxjs";

import { AddProductInterface, ProductResponseWithId} from "@models";
import {PRODUCT_SERVICE} from "@tokens";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit, OnDestroy{
  private route = inject(ActivatedRoute)
  private productService = inject(PRODUCT_SERVICE)
  private unsubscribe = new Subject<void>()
  private router = inject(Router)
  private cdf = inject(ChangeDetectorRef)

  private product!: ProductResponseWithId
  protected productForm!: FormGroup<AddProductInterface<FormControl<string>>>
  protected isSubmitted: boolean = false

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params | {id: string})=> {
          return this.productService.getProductById(params.id)
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((product: ProductResponseWithId)=> {
        this.product = product
        this.productForm = new UntypedFormGroup({
          type: new UntypedFormControl(this.product.type, [Validators.required]),
          title: new UntypedFormControl(this.product.title, [Validators.required]),
          photo: new UntypedFormControl(this.product.photo, [Validators.required]),
          info: new UntypedFormControl(this.product.info, [Validators.required]),
          price: new UntypedFormControl(this.product.price, [Validators.required]),
        })
        this.cdf.markForCheck()
    })
  }

  protected get getAddProductForm(){
    return this.productForm.controls
  }

  updateProduct():void {
    if(this.productForm.invalid) {
      return;
    }
    this.isSubmitted = true
    const product: ProductResponseWithId = <ProductResponseWithId>{
      ...this.product,
      type: this.productForm.value.type,
      title: this.productForm.value.title,
      photo: this.productForm.value.photo,
      info: this.productForm.value.info,
      price: this.productForm.value.price,
      date: new Date()
    }

    this.productService
      .updateProduct(product)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((product: ProductResponseWithId)=> {
      this.isSubmitted = true
      this.product = product
      this.router.navigate(['/admin', 'dashboard'])
    })

  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
