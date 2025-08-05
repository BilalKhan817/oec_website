import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChooseOecComponent } from './why-choose-oec.component';

describe('WhyChooseOecComponent', () => {
  let component: WhyChooseOecComponent;
  let fixture: ComponentFixture<WhyChooseOecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhyChooseOecComponent]
    });
    fixture = TestBed.createComponent(WhyChooseOecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
