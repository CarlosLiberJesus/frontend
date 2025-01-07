import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  IAppSettings,
  LicencedLibService,
} from '@carlosliberjesus/licenced-lib';
import { Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  protected useLicenced = `${environment.useLicenced}`;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  breadcrumb: IAppBreadcrumb = {
    title: 'Ínicio',
    items: [
      {
        label: 'Bem-vindo',
      },
    ],
  };

  constructor(
    private pageService: PageService,
    private userService: UserService,
    private licencedLibService: LicencedLibService
  ) {}

  ngOnInit() {
    if (this.useLicenced) {
      console.log(localStorage.getItem('auth'));
      const settings: IAppSettings = {
        appId: `${environment.appKey}`,
        apiServer: `${environment.apiServer}`,
        token: localStorage.getItem('auth') ?? '',
      };

      this.licencedLibService.start(settings);

      this.licencedLibService.errors$
        .pipe(takeUntil(this.destroy$))
        .subscribe(error => {
          if (error) {
            this.pageService.setAlert(error);
          }
        });
    }
  }

  ngAfterViewInit() {
    if (this.userService.getUser()?.fullname) {
      this.breadcrumb.items?.push({
        label: this.userService.getUser()?.fullname ?? '',
        link: '/libertarios/' + this.userService.getUser()?.uuid,
      });
    }
    this.pageService.setBreadcrumb(this.breadcrumb);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
