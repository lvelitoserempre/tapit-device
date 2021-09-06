import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocDetailComponent } from './poc-detail.component';

describe('PocDetailComponent', () => {
  let component: PocDetailComponent;
  let fixture: ComponentFixture<PocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
