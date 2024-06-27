import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationFontsComponent } from './fonts.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { FontsModel } from './fonts.model';

describe('DocumentationFontsComponent', () => {
  let component: DocumentationFontsComponent;
  let fixture: ComponentFixture<DocumentationFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationFontsComponent, CodeHighlightComponent],
      providers: [FontsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
