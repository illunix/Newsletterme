import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userService.isSignedIn()) {
      this.router.navigateByUrl('/dashboard');
    }

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  onSignUp(): void {
    this.isSubmitted = true;

    if (!this.signUpForm.valid) {
      return;
    }

    var credentials = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this.userService.signUp(credentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/sign-in');
      }
    });
  }
}
