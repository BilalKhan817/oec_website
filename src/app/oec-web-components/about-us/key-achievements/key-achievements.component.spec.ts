import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAchievementsComponent } from './key-achievements.component';

describe('KeyAchievementsComponent', () => {
  let component: KeyAchievementsComponent;
  let fixture: ComponentFixture<KeyAchievementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyAchievementsComponent]
    });
    fixture = TestBed.createComponent(KeyAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
