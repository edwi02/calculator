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
    required:   (controlErrors: any) => `Field is require.`,
    pattern:    (controlErrors: any) => `Data is not valid. Incorrect format.`,
    notEqual:   (controlErrors: any) => `Values not equals.`,
    minlength:  (controlErrors: any) => `Invalid minimum characters. Required minimum ${ controlErrors.requiredLength }`,
    maxlength:  (controlErrors: any) => `Invalid maximum characters. Required maximum ${ controlErrors.requiredLength }`,
    max:  (controlErrors: any) => `Invalid maximum value. Minimum value allowed ${ controlErrors.max.max }`,
    min:  (controlErrors: any) => `Invalid minumim value. Minimum value allowed ${ controlErrors.min.min }`,
    emailUser:  (controlErrors: any) => `Email already exits.`
    
  }

  constructor() {
    // document why this constructor is empty
  }

  public getErrorMessage(
    form: FormGroup,
    controlName: string,
    customMessage?: string
): string {

    type OnlyKeys = keyof typeof this.errorMessages;
    
    const controlErrors = form.get(controlName)?.errors;
    
    
    const errorName: OnlyKeys = controlErrors
      ? Object.keys(controlErrors)[0] as OnlyKeys
      : '' as OnlyKeys;
    
      console.log(controlErrors);
      
    let message = this.errorMessages.hasOwnProperty(errorName)
      ? this.errorMessages[errorName](controlErrors)
      : '';

      if ( !customMessage && customMessage !== '' && message === '' ) {
        message = customMessage!;
      }
    
      if (message === '') {
        console.log(`${errorName} not identified.`);
      }

    return message;
    
}

  public emailErrorMsg(formName: FormGroup, formControlName: string): string {
    
    const errors = formName.get(formControlName)?.errors;
    
    if ( errors?.['required'] ) {
      return 'Username is require';
    } 
    
    if ( errors?.['pattern']) {
      return 'Username is not email valid';
    }

    return '';
  }

  public passwordErrorMsg(formName: FormGroup, formControlName: string): string {

    const errors = formName.get(formControlName)?.errors;

    if ( errors?.['required']) {
      return 'Password is require';
    } 
    
    if ( errors?.['minlength'] ) {
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
