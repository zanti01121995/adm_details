import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feestable1Component } from './feestable1.component';

describe('Feestable1Component', () => {
  let component: Feestable1Component;
  let fixture: ComponentFixture<Feestable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feestable1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Feestable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
