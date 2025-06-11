import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterModel {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:54303/api/auth'; // Change to your backend port

  constructor(private http: HttpClient) { }

  //// register users
  register(user: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'json' } );
  }

  ///// login users
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, { responseType : 'json' });
  }
  //// database test connection
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test-connection`, { responseType: 'json' });
  }
  //// block users.
  blockUser(userId: number): Observable<any> {
    return this.http.post(`http://localhost:54303/api/auth/block-user?userId=$userId` + userId, {});
  }

  //// display all users
  getUsers() {
    return this.http.get<any[]>('http://localhost:54303/api/auth/users');
  }


}
