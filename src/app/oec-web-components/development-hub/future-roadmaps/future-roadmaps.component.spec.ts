import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureRoadmapsComponent } from './future-roadmaps.component';

describe('FutureRoadmapsComponent', () => {
  let component: FutureRoadmapsComponent;
  let fixture: ComponentFixture<FutureRoadmapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutureRoadmapsComponent]
    });
    fixture = TestBed.createComponent(FutureRoadmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
