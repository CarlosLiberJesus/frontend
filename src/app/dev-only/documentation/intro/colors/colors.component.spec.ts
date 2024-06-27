import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationColorsComponent } from './colors.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { ColorsModel } from './colors.model';

describe('DocumentationColorsComponent', () => {
  let component: DocumentationColorsComponent;
  let fixture: ComponentFixture<DocumentationColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationColorsComponent, CodeHighlightComponent],
      providers: [ColorsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
