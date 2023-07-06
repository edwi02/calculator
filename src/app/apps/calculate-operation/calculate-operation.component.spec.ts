import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateOperationComponent } from './calculate-operation.component';

describe('CalculateOperationComponent', () => {
  let component: CalculateOperationComponent;
  let fixture: ComponentFixture<CalculateOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
