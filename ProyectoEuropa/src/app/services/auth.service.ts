import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => localStorage.setItem('pe_token', response.token))
    );
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('pe_token'));
  }

  logout(): void {
    localStorage.removeItem('pe_token');
  }
}
