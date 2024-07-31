import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  link: string = '/';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .isLoadingSubject$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_isLoading: boolean) => {
        if (this.userService.getUser()) {
          this.link = '/inicio';
        } else {
          this.link = '/';
        }
      });
  }

  getLink(): string {
    return this.link;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
