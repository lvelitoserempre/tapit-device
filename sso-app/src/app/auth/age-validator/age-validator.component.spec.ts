import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeValidatorComponent } from './age-validator.component';

describe('AgeValidatorComponent', () => {
  let component: AgeValidatorComponent;
  let fixture: ComponentFixture<AgeValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
