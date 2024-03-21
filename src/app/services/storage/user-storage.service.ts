import { Injectable } from '@angular/core';

const TOKEN = 'my-token';
const USER = 'my-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  public saveToken(token: string): void {
    try {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    } catch (error) {
      console.error('Error saving token to local storage:', error);
    }
  }

  public saveUser(user): void {
    try {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data to local storage:', error);
    }
  }
}
