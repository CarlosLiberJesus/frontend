import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSeparatorComponent } from './separator.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { SeparatorModel } from './separator.model';

describe('DocumentationSeparatorComponent', () => {
  let component: DocumentationSeparatorComponent;
  let fixture: ComponentFixture<DocumentationSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSeparatorComponent, CodeHighlightComponent],
      providers: [SeparatorModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
