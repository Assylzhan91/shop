import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";

import {AddProductInterface, AddProductFormInterface} from "@models";
import {PRODUCT_SERVICE} from "@tokens";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent implements OnInit{
  productService = inject(PRODUCT_SERVICE)
  router = inject(Router)
  cdf = inject(ChangeDetectorRef)

  addProductForm!: FormGroup<AddProductInterface<FormControl<string>>>
  isSubmitted: boolean = false

  ngOnInit(): void {
    this.addProductForm = new UntypedFormGroup({
      type: new UntypedFormControl('Phone', [Validators.required]),
      title: new UntypedFormControl('iPhone 13 Mini 128GB', [Validators.required]),
      photo: new UntypedFormControl('asda', [Validators.required]),
      info: new UntypedFormControl('roducts with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing', [Validators.required]),
      price: new UntypedFormControl('150', [Validators.required]),
    })
  }

  addProduct(): void {
    if(this.addProductForm.invalid) {
      return;
    }
    this.isSubmitted = true
    const product: AddProductFormInterface = <AddProductFormInterface>{
      type: this.addProductForm.value.type,
      title: this.addProductForm.value.title,
      photo: this.addProductForm.value.photo,
      info: this.addProductForm.value.info,
      price: this.addProductForm.value.price,
      date: new Date()
    }
    this.productService
      .createProduct(product)
      .subscribe({
        next: ()=> {
          this.isSubmitted = false
          this.addProductForm.reset()
          this.router.navigate(['/'])
          this.cdf.detectChanges()
        }
      })
  }

  get getAddProductForm() {
    return this.addProductForm.controls
  }
}
