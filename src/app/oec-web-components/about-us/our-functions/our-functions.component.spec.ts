import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFunctionsComponent } from './our-functions.component';

describe('OurFunctionsComponent', () => {
  let component: OurFunctionsComponent;
  let fixture: ComponentFixture<OurFunctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurFunctionsComponent]
    });
    fixture = TestBed.createComponent(OurFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
