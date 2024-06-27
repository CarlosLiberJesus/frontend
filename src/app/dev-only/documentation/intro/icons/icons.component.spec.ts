import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationIconsComponent } from './icons.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { IconsModel } from './icons.model';

describe('DocumentationIconsComponent', () => {
  let component: DocumentationIconsComponent;
  let fixture: ComponentFixture<DocumentationIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationIconsComponent, CodeHighlightComponent],
      providers: [IconsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
