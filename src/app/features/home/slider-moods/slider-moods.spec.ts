import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMoods } from './slider-moods';

describe('SliderMoods', () => {
  let component: SliderMoods;
  let fixture: ComponentFixture<SliderMoods>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderMoods]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMoods);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
