import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { map, catchError, of, Observable } from 'rxjs';
import { OperationType } from './interface/operation-type';

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {

  baseUrl = environment.baseUrl + "/operation";

  get token(): string {
    return this.authService.token;
  }

  get headers(): HttpHeaders {
    return this.authService.headers;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getList(): Observable<OperationType[]> {

    const url = `${ this.baseUrl }/?isActive=true`;
    
    return this.http.get<OperationType[]>( url, {headers: this.headers} )
      .pipe(
        map( ( resp: OperationType[] ) => {
            return resp;
        }),
        catchError( error => of([error]))
      );
  }
}
