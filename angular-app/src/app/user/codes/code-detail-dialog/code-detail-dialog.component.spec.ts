import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDetailDialogComponent } from './code-detail-dialog.component';

describe('CodeDetailDialogComponent', () => {
  let component: CodeDetailDialogComponent;
  let fixture: ComponentFixture<CodeDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
