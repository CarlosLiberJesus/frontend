import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICarousel } from './carousel';

@Component({
  selector: 'app-bootstrap-navigation-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnChanges {
  @Input() carousel!: ICarousel;
  @Output() tabChanged = new EventEmitter<number>();

  timer!: number;
  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * ngOnChanges is called after the component's view has been initialized
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carousel']) {
      if (this.carousel?.timer) {
        this.autoSwitchPanel(this.carousel.timer);
      }
    }
  }

  /**
   * Starts the auto switching of the panels
   * @param time - The time in milliseconds
   */
  autoSwitchPanel(time: number): void {
    if (!this.timer) {
      this.timer = time;
      setInterval(() => {
        const activePane = this.getActive();
        const nextPane = (activePane + 1) % this.carousel.tab.length;
        this.setActive(nextPane);
        this.cdr.detectChanges();
      }, time);
    }
  }

  /**
   * Returns the css classes for the carousel
   * @returns {string}
   */
  getClass(): string {
    return [
      ...(this.carousel.css ?? []),
      'carousel',
      'slide',
      'carousel_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns if the tab is active
   * @param {number} pane - The position of the tab
   * @returns {boolean}
   */
  isActive(pane: number): boolean {
    return this.carousel?.tab[pane].cssLink?.includes('active') ?? false;
  }

  /**
   * Returns the position of the active pane
   */
  getActive(): number {
    return this.carousel?.tab.findIndex(pane =>
      pane.cssLink?.includes('active')
    );
  }

  /**
   * Sets the active tab
   * @param {number} pane
   */
  setActive(pane: number): void {
    this.carousel.tab.forEach(pane => {
      pane.cssLink = pane.cssLink?.filter(cssClass => cssClass !== 'active');
      pane.cssLink = pane.cssLink ?? [];
    });
    this.carousel.tab[pane].cssLink?.push('active');
    this.tabChanged.emit(pane);
  }

  /**
   * Changes the active tab
   * @param {MouseEvent | KeyboardEvent} _$event - The click event
   * @param {number} pane - The position of the tab
   */
  changeTabPane(_$event: MouseEvent | KeyboardEvent, pane: number): void {
    this.setActive(pane);
  }

  /**
   * Changes the active tab
   * @param {MouseEvent | KeyboardEvent} _$event - The click event
   * @param {number} direction - The position of the tab
   */
  changeDefaultTabPane(
    _$event: MouseEvent | KeyboardEvent,
    direction: number
  ): void {
    let nextPane: number = this.getActive() + direction;
    nextPane = nextPane === this.carousel.tab.length ? 0 : nextPane;
    nextPane = nextPane < 0 ? this.carousel.tab.length - 1 : nextPane;
    this.setActive(nextPane);
  }

  /**
   * Returns the css classes for the title
   * @returns {string}
   */
  getTitleClass(): string {
    return [...(this.carousel.cssTitle ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the icon display
   * @returns {string}
   */
  getIconsClass(): string {
    return [...(this.carousel.cssIcons ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the pane
   * @returns {string}
   */
  getPaneClass(): string {
    return [...(this.carousel.cssPane ?? []), 'carousel-inner']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the item
   * @param {pos} pane The position of the tab
   * @returns {string}
   */
  getItemClass(pane: number): string {
    return [
      ...(this.carousel.tab[pane].css ?? []),
      'carousel-item',
      this.isActive(pane) ? 'active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the caption title
   * @param {pos} pane The position of the tab
   * @returns {string}
   */
  getCaptionTitleClass(pos: number): string {
    return [...(this.carousel.tab[pos].caption?.cssTitle ?? [])]
      .filter(Boolean)
      .join(' ');
  }
  /**
   * Returns the css classes for the caption message
   * @param {pos} pane The position of the tab
   * @returns {string}
   */
  getCaptionMessageClass(pos: number): string {
    return [...(this.carousel.tab[pos].caption?.cssMessage ?? [])]
      .filter(Boolean)
      .join(' ');
  }
}
