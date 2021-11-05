import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private baseUrl: string;
  payPalConfig: IPayPalConfig;
  proPlan: boolean;
  name: '';
  lastname: '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.plan !== 'pro' && params.plan !== 'enterprise') {
          this.router.navigateByUrl('/plans');
          return;
        }

        if (params.plan === 'pro') {
          this.proPlan = true;
        }
      });

    const planPrice = this.proPlan ? '15.00' : '35.00';

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AUmf64KFUyRDoXi9GfmILQrvcFzdN8YMki4Rh4amXvmwW185b-VdxLRGHw2A3TcW9F_ICoopPdfUB7EM',
      createOrderOnClient: () => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: planPrice,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: planPrice
              }
            }
          },
          items: [{
            name: (this.proPlan ? 'Pro' : 'Enterprise') + ' Plan Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: planPrice
            }
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: () => {
        const data = {
          userId: this.userService.getCurrentUserId(),
          plan: this.proPlan ? 'pro' : 'enterprise'
        }
        this.http.post<any>(this.baseUrl + 'api/account/change-plan', data).subscribe(() => {
          this.router.navigateByUrl('dashboard');
        });
      }
    }
  }
}
