import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedControlComponent } from './speed-control.component';

describe('SpeedControlComponent', () => {
  let component: SpeedControlComponent;
  let fixture: ComponentFixture<SpeedControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedControlComponent]
    });
    fixture = TestBed.createComponent(SpeedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
