import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationBordersComponent } from './borders.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { BordersModel } from './borders.model';

describe('DocumentationBordersComponent', () => {
  let component: DocumentationBordersComponent;
  let fixture: ComponentFixture<DocumentationBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationBordersComponent, CodeHighlightComponent],
      providers: [BordersModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
