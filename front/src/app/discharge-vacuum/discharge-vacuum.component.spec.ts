import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeVacuumComponent } from './discharge-vacuum.component';

describe('DischargeVacuumComponent', () => {
  let component: DischargeVacuumComponent;
  let fixture: ComponentFixture<DischargeVacuumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DischargeVacuumComponent]
    });
    fixture = TestBed.createComponent(DischargeVacuumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
