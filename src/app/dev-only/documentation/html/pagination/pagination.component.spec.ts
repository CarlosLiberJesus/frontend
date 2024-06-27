import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationPaginationComponent } from './pagination.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { PaginationModel } from './pagination.model';

describe('DocumentationPaginationComponent', () => {
  let component: DocumentationPaginationComponent;
  let fixture: ComponentFixture<DocumentationPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationPaginationComponent, CodeHighlightComponent],
      providers: [PaginationModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
