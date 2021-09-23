import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRcodeReaderComponent } from './qrcode-reader.component';

describe('QRcodeReaderComponent', () => {
  let component: QRcodeReaderComponent;
  let fixture: ComponentFixture<QRcodeReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRcodeReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QRcodeReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
