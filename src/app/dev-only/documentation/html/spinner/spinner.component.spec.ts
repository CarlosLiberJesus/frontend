import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSpinnerComponent } from './spinner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { SpinnerModel } from './spinner.model';

describe('DocumentationSpinnerComponent', () => {
  let component: DocumentationSpinnerComponent;
  let fixture: ComponentFixture<DocumentationSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSpinnerComponent, CodeHighlightComponent],
      providers: [SpinnerModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
