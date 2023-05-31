import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonComponent } from './summon.component';

describe('SummonComponent', () => {
  let component: SummonComponent;
  let fixture: ComponentFixture<SummonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummonComponent]
    });
    fixture = TestBed.createComponent(SummonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
