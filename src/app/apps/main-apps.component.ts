import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../auth/interface/auth.interfaces';
import { AuthService } from '../auth/services/auth.service';
import { MainComponent } from '../auth/pages/main/main.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from './menu/interface/menu.interface';

@Component({
  selector: 'app-main-apps',
  templateUrl: './main-apps.component.html',
  styleUrls: ['./main-apps.component.css']
})
export class MainAppsComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  get user(): User | null {
    let userData = null;
    this.authService.user.subscribe( res => {
      userData = res;
    });
    // return (Object.keys(userData).length === 0) ? null: userData;
    return userData ?? null;
  }

  public menuItem: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  
    this.menuItem = [
      { name: 'New operation', path: 'new-operation', icon: 'add' },
      { name: 'Search record', path: 'home', icon: 'search' },
    ];

    console.log(this.user);
    

  
  }

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */  }

  logout(): void {

    this.sidenav.close();
    this.authService.logout();
    this._snackBar.open('Session closed', '', {
      duration: 4500
    });
    this.router.navigateByUrl('/');
  }

  login(): void {
    this.sidenav.close();
    this.openDialog();
  }

  openDialog(): void {
    const obj = {
      url: 'home'
    };
    const dialogRef = this.dialog.open(MainComponent, {
      data: obj,
      disableClose: true,
      minWidth: 390
    });

    

  }

}
