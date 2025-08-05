import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDownloadsComponent } from './document-downloads.component';

describe('DocumentDownloadsComponent', () => {
  let component: DocumentDownloadsComponent;
  let fixture: ComponentFixture<DocumentDownloadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentDownloadsComponent]
    });
    fixture = TestBed.createComponent(DocumentDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
