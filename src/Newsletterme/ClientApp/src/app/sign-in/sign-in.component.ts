import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signedIn: boolean;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    if (this.userService.isSignedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
    this.signInForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }

  onSignIn(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    if (!this.signInForm.valid) {
      return;
    }

    var credentials = {
      emailOrUsername: this.f['emailOrUsername'].value,
      password: this.f['password'].value
    };

    this.userService.signIn(credentials).subscribe({
      next: (isSignedIn) => {
        if (isSignedIn) {
          this.isLoading = false;
          this.signedIn = true;

          var returnTo = '';
          this.route.queryParams
            .subscribe(params => {
              returnTo = params.return_to
            });
          if (returnTo) {
            this.router.navigateByUrl(returnTo);
            return;
          }
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: () => {
        this.isLoading = false;
        this.signedIn = false;
      }
    });
  }
}
