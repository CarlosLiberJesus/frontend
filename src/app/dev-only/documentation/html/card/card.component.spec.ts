import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationCardComponent } from './card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { CardModel } from './card.model';

describe('DocumentationCardComponent', () => {
  let component: DocumentationCardComponent;
  let fixture: ComponentFixture<DocumentationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationCardComponent, CodeHighlightComponent],
      providers: [CardModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
