import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationHoverMessageComponent } from './hover-message.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { HoverMessageModel } from './hover-message.model';

describe('DocumentationHoverMessageComponent', () => {
  let component: DocumentationHoverMessageComponent;
  let fixture: ComponentFixture<DocumentationHoverMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DocumentationHoverMessageComponent,
        CodeHighlightComponent,
      ],
      providers: [HoverMessageModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationHoverMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
