import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  User
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
export class PanelNavMenuModule { }
