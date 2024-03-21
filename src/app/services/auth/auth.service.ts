import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:1234/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {}

  register(registerRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + 'auth/register', registerRequest);
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };
    return this.http
      .post(BASIC_URL + 'auth/login', body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          // Log the response headers to inspect the authorization header
          console.log('Response Headers:', res.headers);

          // Extract the authorization header
          const authorizationHeader = res.headers.get('Authorization');
          console.log('Authorization Header:', authorizationHeader);

          // Extract the token from the authorization header
          const token = authorizationHeader?.split(' ')[1]; // Assuming the token format is "Bearer <token>"
          const user = res.body;

          if (token && user) {
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            return true;
          }
          return false;
        })
      );
  }
}
