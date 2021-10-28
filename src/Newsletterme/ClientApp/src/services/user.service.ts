import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  signIn(credentials: any): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + 'account/sign-in', credentials).pipe(
      tap(data => {
        localStorage.setItem('access_token', data.accessToken);
      }),
      mapTo(true)
    );
  }

  signUp(credentials: any) {
    this.http.post<any>(this.baseUrl + 'account/sign-up', credentials).subscribe(() => {
      return true;
    });

    return false;
  }

  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  isSignedIn() {
    var accessToken = localStorage.getItem('access_token');

    return accessToken === null ? false : true;
  }
}
