import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapTo } from 'rxjs/operators';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'user-settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private baseUrl: string;
  profileForm: FormGroup;
  showToast: boolean;
  isSubmitted: boolean;
  alreadyExist: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });

    const userId = this.userService.getCurrentUserId();

    this.http.get<any>(this.baseUrl + 'api/account', {
      params: {
        idOrUsername: userId
      }
    }).subscribe({
      next: data => {
        this.profileForm.controls['name'].setValue(data.name);
        this.profileForm.controls['description'].setValue(data.description);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  onSaveChanges() {
    this.isSubmitted = true;

    var profileData = {
      id: this.userService.getCurrentUserId(),
      name: this.f['name'].value,
      description: this.f['description'].value
    };

    this.http.put<any>(this.baseUrl + 'api/account', profileData).subscribe(() => {
      this.showToast = true;
    },
      (error) => {
        this.alreadyExist = true;
      }
    );
  }
}
