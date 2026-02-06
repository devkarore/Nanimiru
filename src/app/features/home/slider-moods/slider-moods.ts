import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

@Component({
  selector: 'app-slider-moods',
  standalone: true,
  imports: [],
  templateUrl: './slider-moods.html',
  styleUrl: './slider-moods.scss',
})
export class SliderMoods implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef<HTMLElement>;
  private swiperInstance?: Swiper;

  ngAfterViewInit(): void {
    const container = this.swiperEl.nativeElement;
    const scrollbarEl = container.querySelector('.swiper-scrollbar') as HTMLElement | null;

    this.swiperInstance = new Swiper(container, {
      modules: [Scrollbar],
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      scrollbar: {
        el: scrollbarEl ?? undefined,
        draggable: true,
      },
    });
  }

  ngOnDestroy(): void {
    this.swiperInstance?.destroy(true, true);
  }
}
