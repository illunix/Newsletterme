import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPayPalModule
  ],
  exports: [
    NgxPayPalModule
  ]
})
export class CheckoutModule { }
