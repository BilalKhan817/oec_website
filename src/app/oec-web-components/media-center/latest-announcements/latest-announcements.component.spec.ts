import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestAnnouncementsComponent } from './latest-announcements.component';

describe('LatestAnnouncementsComponent', () => {
  let component: LatestAnnouncementsComponent;
  let fixture: ComponentFixture<LatestAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(LatestAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
