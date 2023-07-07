import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareRootComponent } from './square-root.component';

describe('SquareRootComponent', () => {
  let component: SquareRootComponent;
  let fixture: ComponentFixture<SquareRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
