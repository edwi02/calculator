import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Record } from '../interface/record-table';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  baseUrl = environment.baseUrl + "/record";

  get headers(): HttpHeaders {
    return this.authService.headers;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  findAll(userId: string): Observable<Record> {

    const url = `${ this.baseUrl }?userId=${userId}&limitRows=100&offsetRows=0`;

    return this.http.get<Record>( url, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }

  delete(id: string): Observable<Record> {

    const url = `${ this.baseUrl }/${id}`;
    console.log(url);
    
    return this.http.delete<Record>( url, {headers: this.headers} )
            .pipe(
              map( resp => resp )
            );
  }


}
