import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCardComponent } from './pro-card.component';

describe('ProCardComponent', () => {
  let component: ProCardComponent;
  let fixture: ComponentFixture<ProCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
