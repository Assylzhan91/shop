import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {

}
