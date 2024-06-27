import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationInputComponent } from './input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { InputModel } from './input.model';

describe('DocumentationInputComponent', () => {
  let component: DocumentationInputComponent;
  let fixture: ComponentFixture<DocumentationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationInputComponent, CodeHighlightComponent],
      providers: [InputModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
