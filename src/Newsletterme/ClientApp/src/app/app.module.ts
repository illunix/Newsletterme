import { NgModule } from '@angular/core';
import { RoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { PanelSideMenuComponent } from './panel/side-menu/side-menu.component';
import { PanelNavMenuComponent } from './panel/nav-menu/nav-menu.component';
import { PanelSideMenuModule } from './panel/side-menu/side-menu.module';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewsletterModalComponent } from './newsletters/add/add.component';
import { PlansComponent } from './plans/plans.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PanelNavMenuModule } from './panel/nav-menu/nav-menu.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AddNewsletterModalModule } from './newsletters/add/add.module';
import { UserProfileComponent } from './user/settings/profile/profile.component';
import { UserSettingsNavComponent } from './user/settings/nav/nav.component';
import { UserSettingsComponent } from './user/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SignInComponent,
    DashboardComponent,
    PanelComponent,
    PanelSideMenuComponent,
    PanelNavMenuComponent,
    NewslettersComponent,
    AddNewsletterModalComponent,
    PlansComponent,
    CheckoutComponent,
    UserSettingsComponent,
    UserSettingsNavComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        allowedDomains: ["localhost"],
        disallowedRoutes: [""],
      },
    }),
    ReactiveFormsModule,
    RoutingModule,
    NgbModule,
    PanelSideMenuModule,
    PanelNavMenuModule,
    CheckoutModule,
    AddNewsletterModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
