import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationCarouselComponent } from './carousel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { CarouselModel } from './carousel.model';

describe('DocumentationCarouselComponent', () => {
  let component: DocumentationCarouselComponent;
  let fixture: ComponentFixture<DocumentationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationCarouselComponent, CodeHighlightComponent],
      providers: [CarouselModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
