import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSideMenuComponent } from './dashboard/side-menu/side-menu.component';
import { DashboardNavMenuComponent } from './dashboard/nav-menu/nav-menu.component';
import { DashboardSideMenuModule } from './dashboard/side-menu/side-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SignInComponent,
    DashboardComponent,
    DashboardSideMenuComponent,
    DashboardNavMenuComponent
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
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' }
    ]),
    DashboardSideMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
