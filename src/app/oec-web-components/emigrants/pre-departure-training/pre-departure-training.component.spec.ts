import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDepartureTrainingComponent } from './pre-departure-training.component';

describe('PreDepartureTrainingComponent', () => {
  let component: PreDepartureTrainingComponent;
  let fixture: ComponentFixture<PreDepartureTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreDepartureTrainingComponent]
    });
    fixture = TestBed.createComponent(PreDepartureTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
