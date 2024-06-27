import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationBulletsComponent } from './bullets.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { BulletsModel } from './bullets.model';
import { FormModule } from 'src/modules/elements/forms/form.module';

describe('DocumentationBulletsComponent', () => {
  let component: DocumentationBulletsComponent;
  let fixture: ComponentFixture<DocumentationBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationBulletsComponent, CodeHighlightComponent],
      providers: [BulletsModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
