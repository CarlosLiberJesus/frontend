import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
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
    private userService: UserService
  ) {}

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
