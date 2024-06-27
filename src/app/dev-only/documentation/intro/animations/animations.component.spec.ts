import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAnimationsComponent } from './animations.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { AnimationsModel } from './animations.model';

describe('DocumentationAnimationsComponent', () => {
  let component: DocumentationAnimationsComponent;
  let fixture: ComponentFixture<DocumentationAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationAnimationsComponent, CodeHighlightComponent],
      providers: [AnimationsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
