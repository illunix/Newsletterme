import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private baseUrl: string;
  totalSubscriptionCount: number;
  todaySubscriptionCount: number;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    const userId = this.userService.getCurrentUserId();

    this.http.get<any>(this.baseUrl + 'api/dashboard', {
      params: {
        userId: userId
      }
    }).subscribe({
      next: data => {
        this.totalSubscriptionCount = data.totalSubscriptionCount;
        this.todaySubscriptionCount = data.todaySubscriptionCount;
      }
    });
  }
}
