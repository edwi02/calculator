import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OperationType, basicOperation } from '../maintenance/operation-type/interface/operation-type';
import { OperationTypeService } from '../maintenance/operation-type/operation-type.service';
import { User } from 'src/app/auth/interface/auth.interfaces';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UserBalanceService } from '../maintenance/user-balance/user-balance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate-operation',
  templateUrl: './calculate-operation.component.html',
  styleUrls: ['./calculate-operation.component.css']
})
export class CalculateOperationComponent implements OnInit {

  public calculatorForm: FormGroup;

  public operationTypes: OperationType[] = [];
  public basicOperation = basicOperation;
  public balance = 0;
  
  get user(): User {
    return this.authService.user;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private operationTypeService: OperationTypeService,
    private validator: ValidatorService,
    private userBalanceService: UserBalanceService
  ) {
    this.calculatorForm = this.fb.group({
      operationType: ['', Validators.required ],
    });
  }

  ngOnInit(): void {
    this.loadOperationTypes();
    this.loadUserBalance();
  }

  loadUserBalance() {
    this.userBalanceService.getByUser(this.user.id)
    .subscribe( 
        userBalance => { this.balance = userBalance.balance; },
        err => {
          this.balance = 0;
          Swal.fire('Balance', `You can't execute operations. Balance: 0`, 'warning')
        } );
  }

  loadOperationTypes(): void {
    this.operationTypeService.getList()
      .subscribe( operationTypes => this.operationTypes = operationTypes);
  }

  refreshBalance(isCompleted: boolean) {
    if(isCompleted) {
      this.loadUserBalance();
    }
  }

  fieldNotValid( form: FormGroup, fieldName: string): boolean | null {
    return this.validator.fieldNotValid(form, fieldName);
  }
}
