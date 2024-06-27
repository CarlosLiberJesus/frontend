import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAvatarComponent } from './avatar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightComponent } from '../../code-highlight/code-highlight.component';
import { AvatarModel } from './avatar.model';

describe('DocumentationAvatarComponent', () => {
  let component: DocumentationAvatarComponent;
  let fixture: ComponentFixture<DocumentationAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationAvatarComponent, CodeHighlightComponent],
      providers: [AvatarModel],
      imports: [FormModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Documentation should create', () => {
    expect(component).toBeTruthy();
  });
});
