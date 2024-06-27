import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IPopOver } from './pop-over';
import { EPosition } from '../../elements';

@Component({
  selector: 'app-bootstrap-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopOverComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() popOver!: IPopOver | null;
  @Input() target!: ElementRef;
  @Output() popOverClosed = new EventEmitter<boolean>();

  @ViewChild('popOverTarget', { static: false }) popOverTarget!: ElementRef;
  @ViewChild('arrowTarget', { static: false }) arrowTarget!: ElementRef;

  private resizeObserver: void | undefined;
  domReady = false;
  first = true;
  randomId: string = this.trimTrailingZeros(Math.random().toString());
  defaultWidth!: number;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.popOver && !this.first) {
        this.popOverClosed.emit(true);
      }
      this.first = false;
    }
  }

  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  ngOnInit(): void {
    // Listen for viewport size changes using ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.recalculatePosition();
    }).observe(document.documentElement);
  }

  ngAfterViewInit(): void {
    this.domReady = true;
    if (this.popOverTarget) {
      this.defaultWidth =
        this.popOverTarget.nativeElement.getBoundingClientRect().width;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['popOver'] && this.domReady) {
      this.popOver = changes['popOver'].currentValue;
      if (this.popOver) {
        setTimeout(() => {
          this.calculatePosition();
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      (this.resizeObserver as unknown as ResizeObserver).disconnect();
    }
  }

  getPopOverClass(): string {
    return [
      ...(this.popOver?.cssContainer ?? []),
      'popover',
      'bs-popover-' + this.getPopOverPosition(),
      'position-absolute',
      'popover_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  getArrowClass(): string {
    return 'popover-arrow position-absolute popover-arrow_' + this.randomId;
  }

  getHeaderClass(): string {
    return [...(this.popOver?.cssTitle ?? []), 'popover-header']
      .filter(Boolean)
      .join(' ');
  }

  getContentClass(): string {
    return [...(this.popOver?.cssContent ?? []), 'popover-body']
      .filter(Boolean)
      .join(' ');
  }

  getPopOverPosition(): string {
    switch (this.popOver?.position) {
      case EPosition.BOTTOM:
        return 'bottom';
      case EPosition.LEFT:
        return 'start';
      case EPosition.RIGHT:
        return 'end';
      default:
        return 'top';
    }
  }

  recalculatePosition(): void {
    if (this.domReady) {
      this.calculatePosition();
    }
  }

  calculatePosition(): void {
    if (!this.popOver) {
      return;
    }

    const targetRect: DOMRect =
      this.target.nativeElement.getBoundingClientRect();
    const arrowHeight: number = this.arrowTarget.nativeElement.offsetHeight;
    let top = 0;
    let left = 0;
    let padding = 0;
    const vertical = 0;
    let popOverWidth: number = this.defaultWidth;

    switch (this.popOver?.position) {
      case EPosition.TOP:
        top =
          -this.popOverTarget.nativeElement.offsetHeight -
          (targetRect.height / 2 + arrowHeight);
        left =
          -(targetRect.width / 2) -
          this.popOverTarget.nativeElement.offsetWidth / 2;
        if (-left > this.popOverTarget.nativeElement.offsetLeft) {
          padding = left + this.popOverTarget.nativeElement.offsetLeft;
          left -= left + this.popOverTarget.nativeElement.offsetLeft - 10;
        }
        this.arrowTarget.nativeElement.style.transform = `translateX(${
          this.popOverTarget.nativeElement.offsetWidth / 2 -
          this.arrowTarget.nativeElement.offsetWidth +
          5 +
          padding
        }px)`;
        break;
      case EPosition.BOTTOM:
        top = targetRect.height / 2 + arrowHeight;
        left =
          -(targetRect.width / 2) -
          this.popOverTarget.nativeElement.offsetWidth / 2;
        this.arrowTarget.nativeElement.style.transform = `translateX(${
          this.popOverTarget.nativeElement.offsetWidth / 2 -
          this.arrowTarget.nativeElement.offsetWidth +
          5 +
          padding
        }px)`;
        break;
      case EPosition.LEFT:
        top = -(this.popOverTarget.nativeElement.offsetHeight / 2);
        left = -(
          this.popOverTarget.nativeElement.offsetWidth +
          this.arrowTarget.nativeElement.offsetWidth +
          targetRect.width
        );
        if (-left > this.popOverTarget.nativeElement.offsetLeft) {
          popOverWidth = targetRect.left - 10;
          left = -(
            popOverWidth +
            this.arrowTarget.nativeElement.offsetWidth +
            targetRect.width
          );
        }
        this.arrowTarget.nativeElement.style.transform = `translateY(${
          (this.popOverTarget.nativeElement.offsetHeight - arrowHeight) / 2 -
          vertical
        }px)`;
        break;
      case EPosition.RIGHT:
        top = -(this.popOverTarget.nativeElement.offsetHeight / 2);
        left = this.arrowTarget.nativeElement.offsetWidth;
        // padding = window.innerWidth - (targetRect.left + targetRect.width);
        // if ((this.popOverTarget.nativeElement.offsetWidth + this.arrowTarget.nativeElement.offsetWidth) > padding) {
        //  console.log("padding", padding);
        //  popOverWidth = padding -10;
        //}
        this.arrowTarget.nativeElement.style.transform = `translateY(${
          (this.popOverTarget.nativeElement.offsetHeight - arrowHeight - 3) /
            2 -
          vertical
        }px)`;
        break;
      default:
        break;
    }

    this.popOverTarget.nativeElement.style.width = `${popOverWidth}px`;
    this.popOverTarget.nativeElement.style.transform = `translate(${left}px, ${
      top + vertical
    }px)`;
  }
}
