import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationButtonComponent } from './button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { ButtonModel } from './button.model';

describe('DocumentationButtonComponent', () => {
  let component: DocumentationButtonComponent;
  let fixture: ComponentFixture<DocumentationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationButtonComponent, CodeHighlightComponent],
      providers: [ButtonModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
