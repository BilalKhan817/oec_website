import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTimelinesComponent } from './service-timelines.component';

describe('ServiceTimelinesComponent', () => {
  let component: ServiceTimelinesComponent;
  let fixture: ComponentFixture<ServiceTimelinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTimelinesComponent]
    });
    fixture = TestBed.createComponent(ServiceTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
