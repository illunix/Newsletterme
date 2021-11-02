import { Component } from '@angular/core';

@Component({
  selector: 'panel-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class PanelNavMenuComponent {
  signOut(): void {
    localStorage.removeItem('access_token');
  }
}
