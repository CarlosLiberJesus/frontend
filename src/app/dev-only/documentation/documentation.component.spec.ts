import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationComponent } from './documentation.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { DocumentationIntroModule } from './intro/intro.module';
import { IntroComponent } from './intro/intro.component';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(async () => {
    // Create a mock ActivatedRoute object
    const mockActivatedRoute = {
      // Implement any required properties or methods used by the component
      fragment: new BehaviorSubject<string>('intro#grelha'),
    };

    await TestBed.configureTestingModule({
      declarations: [DocumentationComponent, IntroComponent],
      imports: [ElementsModule, DocumentationIntroModule],
      providers: [
        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
