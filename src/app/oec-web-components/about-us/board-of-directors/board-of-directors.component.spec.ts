import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOfDirectorsComponent } from './board-of-directors.component';

describe('BoardOfDirectorsComponent', () => {
  let component: BoardOfDirectorsComponent;
  let fixture: ComponentFixture<BoardOfDirectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardOfDirectorsComponent]
    });
    fixture = TestBed.createComponent(BoardOfDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
