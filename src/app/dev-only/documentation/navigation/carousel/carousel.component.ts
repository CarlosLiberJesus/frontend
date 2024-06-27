import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CarouselModel } from './carousel.model';
import { ICarousel } from 'src/modules/elements/navigation/carousel/carousel';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-navigation-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('customTabOne', { read: TemplateRef })
  customTabOne!: TemplateRef<HTMLElement>;
  @ViewChild('customTabTwo', { read: TemplateRef })
  customTabTwo!: TemplateRef<HTMLElement>;
  @ViewChild('customTabThree', { read: TemplateRef })
  customTabThree!: TemplateRef<HTMLElement>;

  carousel!: ICarousel;
  srcCode!: string;

  options!: ICheckBoxList;

  constructor(
    private cdr: ChangeDetectorRef,
    public carouselModel: CarouselModel
  ) {
    this.carouselModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.carouselModel.getOptions();
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    const carousel: ICarousel = {
      title: this.carouselModel.getValue('title'),
      css: [],
      cssTitle: [],
      cssIcons: [],
      cssPane: [],
      tab: [],
    };
    if (this.carouselModel.getValue('style') !== 'default') {
      carousel.css = ['carousel-custom'];
      (carousel.cssTitle = ['fs-4', 'fw-bold', 'pe-2']),
        (carousel.cssIcons = [
          'carousel-indicators',
          'carousel-indicators-dots',
        ]);
      if (this.carouselModel.getValue('style') === 'dots') {
        carousel.cssIcons.push('carousel-indicators-dots');
      }
      if (this.carouselModel.getValue('style') === 'indicators') {
        carousel.cssIcons.push('carousel-indicators-bullet');
      }
      if (this.carouselModel.getFormArrayValue('options').includes('colors')) {
        carousel.cssIcons.push(
          'carousel-indicators-active-' +
            this.carouselModel.getValue('colorControl')
        );
      }
      carousel.cssPane = ['pt-8'];
    } else {
      carousel.css = ['carousel-dark'];
    }
    if (this.carouselModel.getFormArrayValue('options').includes('timer')) {
      carousel.timer = 3000;
    }
    if (
      this.carouselModel.getFormArrayValue('options').includes('indicators')
    ) {
      carousel.indicators = true;
    }

    carousel.tab = [
      {
        content: this.customTabOne,
        cssLink: ['active'],
      },
      {
        cssLink: [],
        content: this.customTabTwo,
      },
      {
        content: this.customTabThree,
        cssLink: [],
      },
    ];
    if (this.carouselModel.getValue('style') === 'default') {
      carousel.tab.map((tab, index) => {
        tab.css = ['paddingDemo'];
        if (
          this.carouselModel.getFormArrayValue('options').includes('captions')
        ) {
          tab.caption = {
            title: 'Legenda ' + (index + 1),
            message: '' + Math.random(),
            cssTitle: ['h5'],
            cssMessage: ['text-muted', 'fs-8'],
          };
        }
      });
    }

    this.carousel = carousel;

    this.srcCode =
      '\nICarousel = ' + JSON.stringify(this.removeContent(carousel), null, 2);
    this.cdr.detectChanges();
  }

  removeContent(carousel: ICarousel) {
    return {
      ...carousel,
      tab: carousel.tab.map(item => {
        const { content, ...rest } = item;
        const serializedContent = this.stringifyTemplateRef(content);
        return { ...rest, content: serializedContent };
      }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringifyTemplateRef(content: any): string {
    if (content instanceof TemplateRef) {
      return 'TemplateRef<HTMLElement>';
    }
    return JSON.stringify(content);
  }

  onChanged() {
    this.startCarousel();
  }
}
