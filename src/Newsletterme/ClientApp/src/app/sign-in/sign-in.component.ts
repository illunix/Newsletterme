import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signedIn: boolean;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }

  onSignIn(): void {
    this.isSubmitted = true;

    if (!this.signInForm.valid) {
      return;
    }

    var credentials = {
      emailOrUsername: this.f['emailOrUsername'].value,
      password: this.f['password'].value
    };

    this.userService.signIn(credentials).subscribe(isSignedIn => {
      if (isSignedIn) {
        this.signedIn = isSignedIn;
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
