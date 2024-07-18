import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  show() {
    this.isVisible.next(true);
  }

  hide() {
    this.isVisible.next(false);
  }

  isVisible$(): Observable<boolean> {
    return this.isVisible.asObservable();
  }
}
