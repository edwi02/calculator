import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BasicResult } from './interface/calculate-operations';

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

  executeOperation(numbers: number[], nameOperation: string): Observable<BasicResult> {

    const url  = `${ this.baseUrl }/${nameOperation}`;
    const body = {numbers: numbers};

    return this.http.post<BasicResult>( url, body, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

}
