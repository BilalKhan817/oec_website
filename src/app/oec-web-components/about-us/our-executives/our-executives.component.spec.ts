import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurExecutivesComponent } from './our-executives.component';

describe('OurExecutivesComponent', () => {
  let component: OurExecutivesComponent;
  let fixture: ComponentFixture<OurExecutivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurExecutivesComponent]
    });
    fixture = TestBed.createComponent(OurExecutivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
