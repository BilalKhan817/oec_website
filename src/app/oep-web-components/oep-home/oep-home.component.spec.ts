import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OepHomeComponent } from './oep-home.component';

describe('OepHomeComponent', () => {
  let component: OepHomeComponent;
  let fixture: ComponentFixture<OepHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OepHomeComponent]
    });
    fixture = TestBed.createComponent(OepHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
