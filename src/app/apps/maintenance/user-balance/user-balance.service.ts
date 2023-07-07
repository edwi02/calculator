import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {

  baseUrl = environment.baseUrl + "/user-balance";

  get headers(): HttpHeaders {
    return this.authService.headers;
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getByUser(id: string): Observable<any> {

    const url = `${ this.baseUrl }/byUser/${id}`;
    const headers = this.headers;

    return this.http.get<any>( url, { headers } )
              .pipe(
                map( resp => resp )
              );
  }
}
