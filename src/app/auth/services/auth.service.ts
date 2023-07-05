import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interface/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _user!: User;

  get user(): Observable<User> {
    return of({ ...this._user});
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
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
