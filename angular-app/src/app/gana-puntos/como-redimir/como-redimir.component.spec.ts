import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoRedimirComponent } from './como-redimir.component';

describe('ComoRedimirComponent', () => {
  let component: ComoRedimirComponent;
  let fixture: ComponentFixture<ComoRedimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComoRedimirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoRedimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
