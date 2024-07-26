import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLibertarioDetalheComponent } from './private-libertario-detalhe.component';

describe('PrivateLibertarioDetalheComponent', () => {
  let component: PrivateLibertarioDetalheComponent;
  let fixture: ComponentFixture<PrivateLibertarioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateLibertarioDetalheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateLibertarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
