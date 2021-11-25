import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './subscribe-newsletter.component.html',
  styleUrls: ['./subscribe-newsletter.component.css']
})
export class SubscribeNewsletterComponent implements OnInit {
  private baseUrl: string;
  private sub: Subscription;
  description: string;
  subscribeForm: FormGroup;
  isSubmitted: boolean;
  creatorName: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.subscribeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.creatorName = params.get('username')!;

      this.http.get<any>(this.baseUrl + 'api/account', {
        params: {
          idOrUsername: this.creatorName
        }
      }).subscribe({
        next: data => {
          this.description = data.description;
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.subscribeForm.controls;
  }

  onSubscribe() {
    this.isSubmitted = true;

    var subscribeData = {
      creatorName: this.creatorName,
      name: this.f['name'].value,
      email: this.f['email'].value
    }

    this.http.put<any>(this.baseUrl + 'api/newsletter/subscribe', subscribeData).subscribe(() => {
    });
  }
}
