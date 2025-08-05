import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignServiceAgreementsComponent } from './foreign-service-agreements.component';

describe('ForeignServiceAgreementsComponent', () => {
  let component: ForeignServiceAgreementsComponent;
  let fixture: ComponentFixture<ForeignServiceAgreementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignServiceAgreementsComponent]
    });
    fixture = TestBed.createComponent(ForeignServiceAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
