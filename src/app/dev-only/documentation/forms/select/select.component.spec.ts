import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSelectComponent } from './select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { SelectModel } from './select.model';

describe('DocumentationSelectComponent', () => {
  let component: DocumentationSelectComponent;
  let fixture: ComponentFixture<DocumentationSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSelectComponent, CodeHighlightComponent],
      providers: [SelectModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
