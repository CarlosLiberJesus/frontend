import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationSliddlerComponent } from './range-slider.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { RangeSliderModel } from './range-slider.model';

describe('DocumentationSliddlerComponent', () => {
  let component: DocumentationSliddlerComponent;
  let fixture: ComponentFixture<DocumentationSliddlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationSliddlerComponent, CodeHighlightComponent],
      providers: [RangeSliderModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationSliddlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
