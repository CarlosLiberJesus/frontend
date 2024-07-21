import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibertarioComponent } from './libertario.component';

describe('LibertarioComponent', () => {
  let component: LibertarioComponent;
  let fixture: ComponentFixture<LibertarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibertarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibertarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
