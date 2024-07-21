import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibertariosComponent } from './libertarios.component';

describe('LibertariosComponent', () => {
  let component: LibertariosComponent;
  let fixture: ComponentFixture<LibertariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibertariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibertariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
