import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class DashboardNavMenuComponent {
  signOut(): void {
    localStorage.removeItem('access_token');
  }
}
