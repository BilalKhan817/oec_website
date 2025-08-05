import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingDirectorMessageComponent } from './managing-director-message.component';

describe('ManagingDirectorMessageComponent', () => {
  let component: ManagingDirectorMessageComponent;
  let fixture: ComponentFixture<ManagingDirectorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagingDirectorMessageComponent]
    });
    fixture = TestBed.createComponent(ManagingDirectorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
