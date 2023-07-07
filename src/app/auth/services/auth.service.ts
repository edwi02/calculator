import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interface/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _user!: User;

  get user(): User {
    return { ...this._user};
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  get headers(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + this.token );
    return headers;
  }


  constructor(
    private http: HttpClient
  ) { }

  login( username: string, password: string ): Observable<AuthService> {

    const url  = `${ this.baseUrl }/auth/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>( url, body )
            .pipe(
              tap( resp => {
                if ( resp ) {
                  this.saveToken(resp);
                }
              }),
              map( resp => resp ),
              catchError( err => of(err) )
            );
  }

  validateToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/check-status`;
    const headers = this.headers;

    return this.http.get<AuthResponse>( url, { headers } )
              .pipe(
                map( resp => {
                  this.saveToken( resp );
                  return true;
                }),
                catchError( err => of(false) )
              );
  }

  logout(): void {
    localStorage.clear();
    this._user = {
      id: '',
      username: ''
    };
  }

  
  saveToken(resp: AuthResponse ): void {

    localStorage.setItem('token', resp.token! );
    this._user = {
      username: resp.username!, // We are sure that data exists.
      id: resp.id
    };

  }
}
