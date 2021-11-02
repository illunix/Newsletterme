import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  signIn(credentials: any): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + 'api/account/sign-in', credentials).pipe(
      tap(data => {
        localStorage.setItem('access_token', data.accessToken);
      }),
      mapTo(true)
    );
  }

  signUp(credentials: any): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + 'api/account/sign-up', credentials).pipe(
      mapTo(true)
    );
  }

  signOut() {
    localStorage.removeItem('access_token');
  }

  getCurrentUserId(): string {
    const userId = this.jwtHelper.decodeToken(this.getAccessToken()!).sub;
    return userId;
  }

  isSignedIn(): boolean {
    const accessToken = this.getAccessToken()!;
    const isExpired = this.jwtHelper.isTokenExpired(accessToken);
    if (isExpired) {
      return false;
    }

    return true;
  }

  private getAccessToken(): string | null {
    const accessToken = localStorage.getItem('access_token');
    return accessToken;
  }
}
