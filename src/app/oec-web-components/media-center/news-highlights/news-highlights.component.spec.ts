import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHighlightsComponent } from './news-highlights.component';

describe('NewsHighlightsComponent', () => {
  let component: NewsHighlightsComponent;
  let fixture: ComponentFixture<NewsHighlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsHighlightsComponent]
    });
    fixture = TestBed.createComponent(NewsHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
