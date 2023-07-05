import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppsComponent } from './main-apps.component';

describe('MainAppsComponent', () => {
  let component: MainAppsComponent;
  let fixture: ComponentFixture<MainAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
