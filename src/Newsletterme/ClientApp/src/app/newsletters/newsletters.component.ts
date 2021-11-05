import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import { AddNewsletterModalComponent } from './add/add.component';

@Component({
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {
  private baseUrl: string;
  newsletters: Newsletter[];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private userService: UserService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.http.get<any>(this.baseUrl + 'api/newsletters', {
      params: {
        userId: this.userService.getCurrentUserId()
      }
    }).subscribe(data => {
      this.newsletters = data;
      console.log(this.newsletters);
    });
  }

  openAddNewsletterModal() {
    this.modalService.open(AddNewsletterModalComponent);
  }
}

interface Newsletter {
  id: string;
  name: string;
  description: string;
  subscriptionCount: number;
}
