import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {AUTH_SERVICE} from "@tokens";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {
  authService = inject(AUTH_SERVICE)

  logout($event: MouseEvent) {
    $event.preventDefault()
    this.authService.logout()
  }
}
