import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { AuthService } from '../services/auth.service';

import { MainComponent } from '../pages/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  
  constructor( private authService: AuthService,
               private router: Router,
               private dialog: MatDialog) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

    const url = route.url[0].path;

    return this.authService.validateToken()
        .pipe( tap( valid => {
        if ( !valid ) {
         // this.router.navigateByUrl('/auth');
         this.openDialog(url);
        }
    }));
  }

canLoad(): Observable<boolean> | boolean {
  return this.authService.validateToken()
    .pipe( tap( valid => {
      if ( !valid ) {
        this.router.navigateByUrl('/home');
        // this.openDialog();
      }
    }));
  }


  openDialog( url: string ): void {

    const obj = {
      url
    };
    const dialogRef = this.dialog.open(MainComponent, {
      data: obj,
      disableClose: true,
      minWidth: 390
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'login' ) {
        this.router.navigateByUrl(url);
      }
    });
  }

}



