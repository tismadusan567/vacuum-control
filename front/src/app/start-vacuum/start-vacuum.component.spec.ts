import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartVacuumComponent } from './start-vacuum.component';

describe('StartVacuumComponent', () => {
  let component: StartVacuumComponent;
  let fixture: ComponentFixture<StartVacuumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartVacuumComponent]
    });
    fixture = TestBed.createComponent(StartVacuumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
