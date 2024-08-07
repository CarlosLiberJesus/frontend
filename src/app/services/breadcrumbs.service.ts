import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppBreadcrumb } from '../lib/interfaces/breadcrumbs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private breadcrumbSubject: BehaviorSubject<IAppBreadcrumb | null> =
    new BehaviorSubject<IAppBreadcrumb | null>(null);
  public breadcrumb$: Observable<IAppBreadcrumb | null> =
    this.breadcrumbSubject.asObservable();

  setBreadcrumb(breadcrumb: IAppBreadcrumb | null): void {
    this.breadcrumbSubject.next(breadcrumb);
  }

  clearBreadcrumb(): void {
    this.breadcrumbSubject.next(null);
  }
}
