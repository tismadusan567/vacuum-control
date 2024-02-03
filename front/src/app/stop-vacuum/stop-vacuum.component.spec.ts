import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopVacuumComponent } from './stop-vacuum.component';

describe('StopVacuumComponent', () => {
  let component: StopVacuumComponent;
  let fixture: ComponentFixture<StopVacuumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopVacuumComponent]
    });
    fixture = TestBed.createComponent(StopVacuumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
