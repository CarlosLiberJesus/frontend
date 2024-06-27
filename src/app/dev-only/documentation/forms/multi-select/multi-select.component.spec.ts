import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationMultiSelectComponent } from './multi-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { MultiSelectModel } from './multi-select.model';

describe('DocumentationMultiSelectComponent', () => {
  let component: DocumentationMultiSelectComponent;
  let fixture: ComponentFixture<DocumentationMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationMultiSelectComponent, CodeHighlightComponent],
      providers: [MultiSelectModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
