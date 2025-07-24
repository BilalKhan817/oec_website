import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignEmployerHomeComponent } from './foreign-employer-home.component';

describe('ForeignEmployerHomeComponent', () => {
  let component: ForeignEmployerHomeComponent;
  let fixture: ComponentFixture<ForeignEmployerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignEmployerHomeComponent]
    });
    fixture = TestBed.createComponent(ForeignEmployerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
