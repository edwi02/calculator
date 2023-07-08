import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CalculateResult, RandomStringResult } from './interface/calculate-operations';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

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

  executeSquareRoot(number: number): Observable<CalculateResult> {

    const url  = `${ this.baseUrl }/square-root`;
    const body = {number};

    return this.http.post<CalculateResult>( url, body, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

  executeRandomString(data: {quantity: number, lenght: number}): Observable<RandomStringResult> {

    const url  = `${ this.baseUrl }/random-string`;
    const body = {...data};    

    return this.http.post<RandomStringResult>( url, body, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

}
