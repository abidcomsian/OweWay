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
  private apiUrl = '/api/auth/register'; // Change to your backend port

  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  ///////////
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

}
