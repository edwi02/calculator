import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CalculateResult } from './interface/calculate-operations';

@Injectable({
  providedIn: 'root'
})
export class CalculateOperationService {

  baseUrl = environment.baseUrl + "/calculate";

  get headers(): HttpHeaders {
    return this.authService.headers;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  executeBasicOperation(numbers: number[], nameOperation: string): Observable<CalculateResult> {

    const url  = `${ this.baseUrl }/${nameOperation}`;
    console.log(url);
    
    const body = {numbers};

    return this.http.post<CalculateResult>( url, body, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

  executeSquareRoot(number: number, nameOperation: string): Observable<CalculateResult> {

    const url  = `${ this.baseUrl }/${nameOperation}`;
    const body = {number};

    return this.http.post<CalculateResult>( url, body, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

}
