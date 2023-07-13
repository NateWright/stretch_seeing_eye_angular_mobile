import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosInputComponent } from './ros-input.component';

describe('RosInputComponent', () => {
  let component: RosInputComponent;
  let fixture: ComponentFixture<RosInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosInputComponent]
    });
    fixture = TestBed.createComponent(RosInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
