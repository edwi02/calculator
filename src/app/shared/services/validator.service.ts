import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public get emailPattern() {
    return '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,3}';
  }

  public get passwordPattern() {
    return '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$';
  }

  private errorMessages = {
    required:   () => `Field is require.`,
    pattern:    () => `Data is not valid. Incorrect format.`,
    notEqual:   () => `Values not equals.`,
    minlength:  () => `Invalid minumim characters.`,
    maxlength:  () => `Invalid maximum characters.`,
    emailUser:  () => `Email already exits.`
    
  }

  constructor() {
    // document why this constructor is empty
  }

  public commonMessage( controlErrors: any, labelName: string ): string {
        
    const error: any = controlErrors
      ? Object.values(controlErrors)[0]
      : '';

    if ( controlErrors?.['required'] ) {
      return this.errorMessages.required();

    } else if ( controlErrors?.['pattern']) {
      return `${ this.errorMessages.pattern() }. Incorrect format ${ labelName }.`;

    } else if ( controlErrors?.['emailUsed'] ) {
      return this.errorMessages.emailUser();

    } else if ( controlErrors?.['minlength']) {
      return `${ this.errorMessages.minlength() }. Required characters: ${ error.requiredLength }`;

    } else if ( controlErrors?.['maxlength']) {
      return `${ this.errorMessages.maxlength() }. Maximum allowed: ${ error.requiredLength }`;

    }
    return '';
  }

  public emailErrorMsg(formName: FormGroup, formControlName: string): string {
    
    const errors = formName.get(formControlName)?.errors;
    
    if ( errors?.['required'] ) {
      return 'Username is require';
    } else if ( errors?.['pattern']) {
      return 'Username is not email valid';
    }
    return '';
  }

  public passwordErrorMsg(formName: FormGroup, formControlName: string): string {
    const errors = formName.get(formControlName)?.errors;
    if ( errors?.['required']) {
      return 'Password is require';
    } else if ( errors?.['minlength'] ) {
      return 'Invalid minumim characters. Minimum allowed: ' + errors?.['minlength'].requiredLength;
    }
    return '';
  }

  public valuesMatching( fieldOne: string, fieldTwo: string ): any {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const valueOne = formGroup.get(fieldOne)?.value;
      const valueTwo = formGroup.get(fieldTwo)?.value;

      if ( valueOne !== valueTwo || valueTwo === null) {
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(fieldTwo)?.setErrors( null );

      return null;
    }
  }

  public fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
      return form.controls[fieldName].errors
              && (form.controls[fieldName].dirty || form.controls[fieldName].touched);
  }

}
