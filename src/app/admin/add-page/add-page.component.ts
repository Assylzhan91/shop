import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";

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
  addProductForm!: FormGroup<AddProductInterface<FormControl<string>>>
  isSubmitted: boolean = false

  ngOnInit(): void {
    this.addProductForm = new UntypedFormGroup({
      type: new UntypedFormControl('Phone', [Validators.required]),
      title: new UntypedFormControl('asda', [Validators.required]),
      photo: new UntypedFormControl('asda', [Validators.required]),
      info: new UntypedFormControl('asdas', [Validators.required]),
      price: new UntypedFormControl('asdasd', [Validators.required]),
    })
  }

  addProduct(): void {
    if(this.addProductForm.invalid) {
      return;
    }
    this.isSubmitted = true
    const product: AddProductFormInterface = {
      type: this.addProductForm.value.type,
      title: this.addProductForm.value.title,
      photo: this.addProductForm.value.photo,
      info: this.addProductForm.value.info,
      price: this.addProductForm.value.price,
      dataAdd: new Date()
    }
    this.productService.create(product).subscribe(console.log)
  }

  get getAddProductForm() {
    return this.addProductForm.controls
  }
}
