import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  getStartedWithProPlan() {
    const returnTo = 'checkout?plan=pro';
    if (this.userService.isSignedIn()) {
      this.router.navigateByUrl(returnTo);
      return;
    }
    this.router.navigate(['sign-in'], {
      queryParams: {
        return_to: 'checkout?plan=pro'
      }
    })
  }

  getStartedWithEnterprisePlan() {
    const returnTo = 'checkout?plan=enterprise';
    if (this.userService.isSignedIn()) {
      this.router.navigateByUrl(returnTo);
      return;
    }
    this.router.navigate(['sign-in'], {
      queryParams: {
        return_to: returnTo
      }
    })
  }
}
