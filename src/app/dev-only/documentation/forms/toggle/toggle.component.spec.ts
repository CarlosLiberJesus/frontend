import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationToggleComponent } from './toggle.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { ToggleModel } from './toggle.model';

describe('DocumentationToggleComponent', () => {
  let component: DocumentationToggleComponent;
  let fixture: ComponentFixture<DocumentationToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationToggleComponent, CodeHighlightComponent],
      providers: [ToggleModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
