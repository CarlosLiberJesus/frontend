import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements AfterViewInit {
  @ViewChild('splashScreen', { static: false }) splashScreen: ElementRef;

  isAnimationComplete = false;

  constructor(private animationBuilder: AnimationBuilder) {}

  ngAfterViewInit() {
    this.hide();
  }

  hide() {
    if (this.isAnimationComplete) {
      return;
    }

    this.isAnimationComplete = false;
    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(800, style({ opacity: '0' }))])
      .create(this.splashScreen.nativeElement);

    player.onDone(() => {
      this.splashScreen.nativeElement.style.display = 'none';
      this.isAnimationComplete = true;
    });

    setTimeout(() => player.play(), 100);
  }

  /**
   * Show
   */
  show() {
    if (this.isAnimationComplete || !this.splashScreen) {
      return;
    }
    this.isAnimationComplete = false;

    const player = this.animationBuilder
      .build([style({ opacity: '0' }), animate(800, style({ opacity: '1' }))])
      .create(this.splashScreen.nativeElement);

    player.onDone(() => {
      this.isAnimationComplete = false;
    });

    setTimeout(() => player.play(), 100);
  }
}
