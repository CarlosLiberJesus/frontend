import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationButtonGroupComponent } from './button-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { ButtonGroupModel } from './button-group.model';

describe('DocumentationButtonGroupComponent', () => {
  let component: DocumentationButtonGroupComponent;
  let fixture: ComponentFixture<DocumentationButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationButtonGroupComponent, CodeHighlightComponent],
      providers: [ButtonGroupModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
