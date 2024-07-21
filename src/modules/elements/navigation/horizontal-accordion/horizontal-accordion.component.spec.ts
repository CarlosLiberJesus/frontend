import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalAccordionComponent } from './horizontal-accordion.component';

describe('HorizontalAccordionComponent', () => {
  let component: HorizontalAccordionComponent;
  let fixture: ComponentFixture<HorizontalAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
