import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStopComponent } from './e-stop.component';

describe('EStopComponent', () => {
  let component: EStopComponent;
  let fixture: ComponentFixture<EStopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EStopComponent]
    });
    fixture = TestBed.createComponent(EStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
