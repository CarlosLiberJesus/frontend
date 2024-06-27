import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationCheckBoxComponent } from './check-box.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { CheckBoxModel } from './check-box.model';

describe('DocumentationCheckBoxComponent', () => {
  let component: DocumentationCheckBoxComponent;
  let fixture: ComponentFixture<DocumentationCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationCheckBoxComponent, CodeHighlightComponent],
      providers: [CheckBoxModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
