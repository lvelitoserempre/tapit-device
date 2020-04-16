import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlaceholderComponent } from './event-placeholder.component';

describe('EventPlaceholderComponent', () => {
  let component: EventPlaceholderComponent;
  let fixture: ComponentFixture<EventPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
