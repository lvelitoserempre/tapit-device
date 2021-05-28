import { ComponentFixture, TestBed } from '@angular/core/testing';

import { userText } from './userText.component';

describe('userText', () => {
  let component: userText;
  let fixture: ComponentFixture<userText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ userText ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(userText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
