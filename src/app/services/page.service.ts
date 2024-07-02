import { Injectable } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';
import { IAppBreadcrumb } from '../interfaces/breadcrumbs';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Subject, Observable } from 'rxjs';
import { IAppAlert } from '../interfaces/app-alert';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private splashScreenService: SplashScreenService,
    private breadcrumbService: BreadcrumbsService,
    private alertService: AlertService
  ) {}

  hideSplashScreen(): void {
    this.splashScreenService.hide();
  }

  setAlert(alert: IAppAlert): void {
    this.alertService.setAlert(alert);
  }

  setBreadcrumb(breadcrumb: IAppBreadcrumb): void {
    this.breadcrumbService.setBreadcrumb(breadcrumb);
  }

  getBreadcrumb(): Observable<IAppBreadcrumb | null> {
    return this.breadcrumbService.breadcrumb$;
  }
}
