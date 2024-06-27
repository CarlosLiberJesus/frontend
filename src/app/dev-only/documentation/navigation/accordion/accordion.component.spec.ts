import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAccordionComponent } from './accordion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { AccordionModel } from './accordion.model';

describe('DocumentationAccordionComponent', () => {
  let component: DocumentationAccordionComponent;
  let fixture: ComponentFixture<DocumentationAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationAccordionComponent, CodeHighlightComponent],
      providers: [AccordionModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
