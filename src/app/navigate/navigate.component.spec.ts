import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateComponent } from './navigate.component';

describe('NavigateComponent', () => {
  let component: NavigateComponent;
  let fixture: ComponentFixture<NavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigateComponent]
    });
    fixture = TestBed.createComponent(NavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
