import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderAgeComponent } from './under-age.component';

describe('UnderAgeComponent', () => {
  let component: UnderAgeComponent;
  let fixture: ComponentFixture<UnderAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
