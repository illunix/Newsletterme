import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home, Inbox } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Home,
  Inbox
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class PanelSideMenuModule { }
