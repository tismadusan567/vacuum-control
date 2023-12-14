import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDetectionComponent } from './language-detection.component';

describe('LanguageDetectionComponent', () => {
  let component: LanguageDetectionComponent;
  let fixture: ComponentFixture<LanguageDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageDetectionComponent]
    });
    fixture = TestBed.createComponent(LanguageDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
