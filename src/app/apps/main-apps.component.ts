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

  public menuItem: MenuItem[] = [];
  public title: string = 'Calculator EdQr';

  get user(): User {
    return this.authService.user;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  
    this.menuItem = [
      { name: 'Calculate operation', path: 'calculate-operation', icon: 'add' },
      { name: 'Search record', path: 'home', icon: 'search' },
    ];
 
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
