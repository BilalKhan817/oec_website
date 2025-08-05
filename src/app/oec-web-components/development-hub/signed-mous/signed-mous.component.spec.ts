import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedMousComponent } from './signed-mous.component';

describe('SignedMousComponent', () => {
  let component: SignedMousComponent;
  let fixture: ComponentFixture<SignedMousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignedMousComponent]
    });
    fixture = TestBed.createComponent(SignedMousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
