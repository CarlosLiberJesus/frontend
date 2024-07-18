import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private isVisible = new BehaviorSubject<boolean>(false);

  showWithDelay(delayTime: number) {
    // Show splash screen
    this.isVisible.next(true);

    // Delay navigation
    return this.isVisible.pipe(delay(delayTime)).toPromise();
  }

  hide() {
    this.isVisible.next(false);
  }

  isVisible$() {
    return this.isVisible.asObservable();
  }
}
