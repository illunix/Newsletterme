import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-settings-nav',
  templateUrl: './nav.component.html'
})
export class UserSettingsNavComponent {
  constructor(
    private router: Router
  ) { }
}
