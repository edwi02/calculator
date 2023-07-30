import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { CalculateOperationService } from '../calculate-operation.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-square-root',
  templateUrl: './square-root.component.html',
  styleUrls: ['./square-root.component.css']
})
export class SquareRootComponent implements OnInit {

  @Input('operationType') operationType: string = '';
  @Output() isCompleted = new EventEmitter<boolean>();

  public oneNumber: string = '';
  public squareRootForm: FormGroup;
  public result: string = '';

  constructor(
    private fb: FormBuilder,
    private calculateOperationService: CalculateOperationService,
    private validator: ValidatorService,
  ) {
    this.squareRootForm = this.fb.group({
      oneNumber: ['', [
        Validators.required, 
        Validators.min(0),
      ]],
    });
  }

  get oneNumberErrorMsg(): string {
    return this.validator.getErrorMessage(this.squareRootForm, 'oneNumber');
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }

  executeCalculate() {
    const { oneNumber } = this.squareRootForm.value;
    this.calculateOperationService.executeSquareRoot(Number(oneNumber))
          .subscribe( 
            resp => {
              this.result = resp.result;
              this.oneNumber = '';
              this.isCompleted.emit(true);
              Swal.fire('Calculate completed!', `Result <strong>${ this.result }</strong>`, 'success');
            },
            err => {
              console.log(err);
              Swal.fire('Calculate incompleted', `${err.error.message}`, 'error')
              this.isCompleted.emit(false);
            }
          );    
  }

  fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
    return this.validator.fieldNotValid(form, fieldName);
  }

}
