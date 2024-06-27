import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationMenuComponent } from './menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { MenuModel } from './menu.model';

describe('DocumentationMenuComponent', () => {
  let component: DocumentationMenuComponent;
  let fixture: ComponentFixture<DocumentationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationMenuComponent, CodeHighlightComponent],
      providers: [MenuModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
