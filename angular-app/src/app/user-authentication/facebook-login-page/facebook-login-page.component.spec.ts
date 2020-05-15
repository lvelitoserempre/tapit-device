import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginPageComponent } from './facebook-login-page.component';

describe('FacebookLoginPageComponent', () => {
  let component: FacebookLoginPageComponent;
  let fixture: ComponentFixture<FacebookLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
