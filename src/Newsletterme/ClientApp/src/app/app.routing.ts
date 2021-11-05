import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from './panel/panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './_helpers/auth.guard';
import { PlansComponent } from './plans/plans.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserSettingsComponent } from './user/settings/settings.component';
import { UserProfileComponent } from './user/settings/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'plans',
    component: PlansComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'dashboard',
    component: PanelComponent,
    children: [{ path: '', component: DashboardComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: 'newsletters',
    component: PanelComponent,
    children: [{ path: '', component: NewslettersComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    children: [{
      path: 'profile', component: UserProfileComponent
    }],
    canActivate: [AuthGuard]
  }
];

export const RoutingModule = RouterModule.forRoot(routes);
