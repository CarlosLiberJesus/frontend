import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationTabsComponent } from './tabs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { TabsModel } from './tabs.model';

describe('DocumentationTabsComponent', () => {
  let component: DocumentationTabsComponent;
  let fixture: ComponentFixture<DocumentationTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationTabsComponent, CodeHighlightComponent],
      providers: [TabsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
