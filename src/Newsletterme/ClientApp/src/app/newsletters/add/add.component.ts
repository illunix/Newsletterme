import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'add-newsletter-modal',
  templateUrl: './add.component.html'
})
export class AddNewsletterModalComponent implements OnInit {
  private baseUrl: string;
  addForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private userService: UserService
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.addForm.valid) {
      return;
    }

    const data = {
      userId: this.userService.getCurrentUserId(),
      name: this.f['name'].value,
      description: this.f['description'].value
    };

    this.http.post<any>(this.baseUrl + 'api/newsletters', data).subscribe(() => {
      this.modal.close();
    });
  }
}
