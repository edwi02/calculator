import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hidePass = true;
  public localData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private validator: ValidatorService,
    private _snackBar: MatSnackBar,
    @Optional() 
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    
    this.localData = { ...data };

    this.loginForm = this.fb.group({
      username:    [ 'edwinqr-a@gmail.com', [
        Validators.required,
        Validators.pattern(validator.emailPattern)
      ] ],
      password: [ '3dwIn-a', [
        Validators.required,
        Validators.minLength(6)
       ] ]
    });

  }

  get emailErrorMsg(): string {
    return this.validator.emailErrorMsg(this.loginForm, 'username');
  }

  get passwordErrorMsg(): string {
    return this.validator.passwordErrorMsg(this.loginForm, 'password');
  }

  ngOnInit(): void { }

  login(): void {
    
    Swal.fire('Loading', 'Checking credentials...', 'info');

    const { username, password } = this.loginForm.value;

    this.authService.login( username, password )
      .subscribe( (resp: any) => {

        const { id } = resp;
  
        if ( id !== undefined ) {
          Swal.close();
          this.closeDialog('login');
          this._snackBar.open('Login success', '', { duration: 4500 });         
          this.router.navigateByUrl(this.localData.url);
        } else {
          Swal.fire('Error', 'Incorrect credentials', 'error');
        }
      });
  }

  fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
    return this.validator.fieldNotValid(form, fieldName);
  }

  closeDialog(event: string ): void {

    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    
    this.dialogRef.close( { event } );
  }

}
