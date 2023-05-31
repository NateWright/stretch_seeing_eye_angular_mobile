import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeControlComponent } from './mode-control.component';

describe('ModeControlComponent', () => {
  let component: ModeControlComponent;
  let fixture: ComponentFixture<ModeControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeControlComponent]
    });
    fixture = TestBed.createComponent(ModeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
