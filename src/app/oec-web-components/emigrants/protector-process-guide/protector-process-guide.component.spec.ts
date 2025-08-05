import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectorProcessGuideComponent } from './protector-process-guide.component';

describe('ProtectorProcessGuideComponent', () => {
  let component: ProtectorProcessGuideComponent;
  let fixture: ComponentFixture<ProtectorProcessGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectorProcessGuideComponent]
    });
    fixture = TestBed.createComponent(ProtectorProcessGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
