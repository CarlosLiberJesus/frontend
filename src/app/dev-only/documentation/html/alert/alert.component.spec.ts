import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAlertsComponent } from './alert.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { AlertsModel } from './alerts.model';

describe('DocumentationAlertsComponent', () => {
  let component: DocumentationAlertsComponent;
  let fixture: ComponentFixture<DocumentationAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationAlertsComponent, CodeHighlightComponent],
      providers: [AlertsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
