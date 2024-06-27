import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationTableComponent } from './table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { TableModel } from './table.model';

describe('DocumentationTableComponent', () => {
  let component: DocumentationTableComponent;
  let fixture: ComponentFixture<DocumentationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationTableComponent, CodeHighlightComponent],
      providers: [TableModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
