import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationBadgeComponent } from './badge.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { BadgeModel } from './badge.model';

describe('DocumentationBadgeComponent', () => {
  let component: DocumentationBadgeComponent;
  let fixture: ComponentFixture<DocumentationBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationBadgeComponent, CodeHighlightComponent],
      providers: [BadgeModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
