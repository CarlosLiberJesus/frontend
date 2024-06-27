import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSizesComponent } from './sizes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { SizesModel } from './sizes.model';

describe('DocumentationSizesComponent', () => {
  let component: DocumentationSizesComponent;
  let fixture: ComponentFixture<DocumentationSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSizesComponent, CodeHighlightComponent],
      providers: [SizesModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
