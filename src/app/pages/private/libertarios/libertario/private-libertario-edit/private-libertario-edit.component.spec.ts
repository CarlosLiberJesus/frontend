import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLibertarioEditComponent } from './private-libertario-edit.component';

describe('PrivateLibertarioEditComponent', () => {
  let component: PrivateLibertarioEditComponent;
  let fixture: ComponentFixture<PrivateLibertarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateLibertarioEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateLibertarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
