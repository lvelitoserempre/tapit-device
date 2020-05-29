import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCodesComponent } from './codes.component';

describe('MyCodesComponent', () => {
  let component: MyCodesComponent;
  let fixture: ComponentFixture<MyCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
