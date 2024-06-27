import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationRadioComponent } from './radio.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { RadioModel } from './radio.model';

describe('DocumentationRadioComponent', () => {
  let component: DocumentationRadioComponent;
  let fixture: ComponentFixture<DocumentationRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationRadioComponent, CodeHighlightComponent],
      providers: [RadioModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
