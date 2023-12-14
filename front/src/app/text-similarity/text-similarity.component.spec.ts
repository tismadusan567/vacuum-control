import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSimilarityComponent } from './text-similarity.component';

describe('TextSimilarityComponent', () => {
  let component: TextSimilarityComponent;
  let fixture: ComponentFixture<TextSimilarityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextSimilarityComponent]
    });
    fixture = TestBed.createComponent(TextSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
