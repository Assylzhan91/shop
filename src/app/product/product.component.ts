import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetAllProductsInterface} from "@models";
import {QuillViewComponent} from "ngx-quill";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'shop-product',
  standalone: true,
  imports: [CommonModule, QuillViewComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input({required: true}) product!: GetAllProductsInterface
}
