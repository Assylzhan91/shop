import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AddProductInterface} from "@models";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent implements OnInit{
  addProductForm!: FormGroup<AddProductInterface>

  ngOnInit(): void {
    this.addProductForm = new FormGroup<AddProductInterface>({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })
  }

  addProduct(): void {
    if(this.addProductForm.invalid) {
      return;
    }
    const product = {
      type: this.addProductForm.value,
      title: this.addProductForm.value,
      photo: this.addProductForm.value,
      info: this.addProductForm.value,
      price: this.addProductForm.value,
    }
    console.log(this.addProductForm.controls)
  }

  get getAddProductForm() {
    return this.addProductForm.controls
  }
}
