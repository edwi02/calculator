import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';

import Swal from 'sweetalert2';

import { ValidatorService } from 'src/app/shared/services/validator.service';
import { CalculateOperationService } from '../calculate-operation.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  @Input('operationType') operationType: string = '';
  @Output() isCompleted = new EventEmitter<boolean>();
  
  public numberList: string[] = [];
  public announcer = inject(LiveAnnouncer);
  public basicForm: FormGroup;
  public result: string = '';

  constructor(
    private fb: FormBuilder,
    private calculateOperationService: CalculateOperationService,
    private validator: ValidatorService,
  ) {
    this.basicForm = this.fb.group({});
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
   }

  executeCalculate() {
    const numbers = this.getNumberArray();
    this.calculateOperationService.executeOperation(numbers, this.operationType)
          .subscribe( 
            resp => {
              this.result = resp.result;
              this.numberList = [];
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

  removeOneNumber(oneNumber: string) {
    const index = this.numberList.indexOf(oneNumber);
    if (index >= 0) {
      this.numberList.splice(index, 1);
      this.announcer.announce(`removed ${oneNumber}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (this.containsOnlyNumbers(value)) {
      this.numberList.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  containsOnlyNumbers(value: string) {
    return /^-?\d+/.test(value);
  }

  getNumberArray(): number[] {
    const values = this.numberList ?? [];
    return values.map(value=>Number(value));
  }

  fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
    return this.validator.fieldNotValid(form, fieldName);
  }

}
