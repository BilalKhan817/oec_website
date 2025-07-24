import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsHomeComponent } from './eps-home.component';

describe('EpsHomeComponent', () => {
  let component: EpsHomeComponent;
  let fixture: ComponentFixture<EpsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpsHomeComponent]
    });
    fixture = TestBed.createComponent(EpsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
