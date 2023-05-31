import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LODControlComponent } from './lod-control.component';

describe('LODControlComponent', () => {
  let component: LODControlComponent;
  let fixture: ComponentFixture<LODControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LODControlComponent]
    });
    fixture = TestBed.createComponent(LODControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
