import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationBreadcrumbsComponent } from './breadcrumbs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { BreadcrumbsModel } from './breadcrumbs.model';

describe('DocumentationBreadcrumbsComponent', () => {
  let component: DocumentationBreadcrumbsComponent;
  let fixture: ComponentFixture<DocumentationBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationBreadcrumbsComponent, CodeHighlightComponent],
      providers: [BreadcrumbsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
