import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {

}
