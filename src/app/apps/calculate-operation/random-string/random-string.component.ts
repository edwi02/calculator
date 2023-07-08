import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CalculateOperationService } from '../calculate-operation.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-random-string',
  templateUrl: './random-string.component.html',
  styleUrls: ['./random-string.component.css']
})
export class RandomStringComponent implements OnInit {

  @Input('operationType') operationType: string = '';
  @Output() isCompleted = new EventEmitter<boolean>();

  public oneNumber: string = '';
  public randomStringForm: FormGroup;
  public result: string[] = [];

  constructor(
    private fb: FormBuilder,
    private calculateOperationService: CalculateOperationService,
    private validator: ValidatorService,
  ) {
    this.randomStringForm = this.fb.group({
      quantity: ['', [
        Validators.required,
        Validators.max(20)
      ]],
      length: ['', [
        Validators.required,
        Validators.max(15)
      ]],
    });
  }

  get quantityErrorMsg(): string {
    return this.validator.getErrorMessage(this.randomStringForm, 'quantity');
  }

  get lengthErrorMsg(): string {
    return this.validator.getErrorMessage(this.randomStringForm, 'length');
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty 
  }

  executeCalculate() {
    const data = this.randomStringForm.value;

    this.calculateOperationService.executeRandomString(data)
          .subscribe( 
            resp => {
              this.result = resp.result;
              this.oneNumber = '';
              this.isCompleted.emit(true);
              console.log(resp.result);
              
              Swal.fire({
                title: 'Calculate completed!',
                html: `Result <strong>${ this.createTableHtml(resp.result) }</strong>`,
                icon: 'success'});
            },
            err => {
              console.log(err);
              Swal.fire('Calculate incompleted', `${err.error.message}`, 'error')
              this.isCompleted.emit(false);
            }
          );    
  }

  createTableHtml(values: string[]) {
    let htmlFormat = '';
    values.forEach( value => {
      htmlFormat += `<div>${value}</div>`;
    });

    return htmlFormat;

  }

  fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
    return this.validator.fieldNotValid(form, fieldName);
  }

}
