import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusfeeComponent } from './busfee.component';

describe('BusfeeComponent', () => {
  let component: BusfeeComponent;
  let fixture: ComponentFixture<BusfeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusfeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
