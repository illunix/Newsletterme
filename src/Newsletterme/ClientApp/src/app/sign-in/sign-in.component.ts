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
  submitted = false;
  signedIn: Observable<boolean>;

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
    this.submitted = true;

    if (!this.signInForm.valid) {
      return;
    }

    var credentials = {
      emailOrUsername: this.f['emailOrUsername'].value,
      password: this.f['password'].value
    };

    console.log(this.signedIn);

    this.signedIn = this.userService.signIn(credentials);
    if (this.signedIn) {
      // this.router.navigateByUrl('/dashboard');
    }
  }
}
