import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from "@shared";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {
  authService = inject(AuthService)

  logout($event: MouseEvent) {
    $event.preventDefault()
    this.authService.logout()
  }
}
