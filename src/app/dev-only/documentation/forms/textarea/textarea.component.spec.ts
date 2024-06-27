import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationTextareaComponent } from './textarea.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { TextareaModel } from './textarea.model';

describe('DocumentationTextareaComponent', () => {
  let component: DocumentationTextareaComponent;
  let fixture: ComponentFixture<DocumentationTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationTextareaComponent, CodeHighlightComponent],
      providers: [TextareaModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
