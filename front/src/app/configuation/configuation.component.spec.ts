import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguationComponent } from './configuation.component';

describe('ConfiguationComponent', () => {
  let component: ConfiguationComponent;
  let fixture: ComponentFixture<ConfiguationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguationComponent]
    });
    fixture = TestBed.createComponent(ConfiguationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
