import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationGridComponent } from './grid.component';

describe('DocumentationGridComponent', () => {
  let component: DocumentationGridComponent;
  let fixture: ComponentFixture<DocumentationGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationGridComponent],
    });
    fixture = TestBed.createComponent(DocumentationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
