import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ciudades } from './ciudades';

describe('ciudades', () => {
  let component: ciudades;
  let fixture: ComponentFixture<ciudades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ciudades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ciudades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
