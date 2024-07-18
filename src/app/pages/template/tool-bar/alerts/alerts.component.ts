import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAppAlert } from 'src/app/interfaces/app-alert';
import { AlertService } from 'src/app/services/alert.service';
import { IIcon } from 'src/modules/elements/base/icon/icon';
import { IAlert } from 'src/modules/elements/html/alert/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  alert!: IAlert | null;

  constructor(
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.alertService
      .getAlert()
      .pipe(takeUntil(this.destroy$))
      .subscribe((incoming: IAppAlert | undefined) => {
        //console.log('## incoming Alert', incoming);
        this.alert = null;
        this.cdr.detectChanges();
        if (incoming === undefined) {
          return;
        }
        const css = [
          'animate__animated animate__zoomIn animate__faster',
          'alert-dismissible',
          'me-5',
          'mt-3',
          'z-index-2',
        ];
        const icon = {
          library: 'bi',
          value: '',
          css: ['fs-2hx', 'me-4'],
        };
        const title = incoming.title;
        let message = incoming.message;
        if (incoming.code === 200) {
          css.push('alert-success');
          icon.value = 'shield-check';
          icon.css.push('text-success');
        } else if (incoming.code > 400) {
          css.push('alert-danger');
          icon.value = 'bi-shield-x';
          icon.css.push('text-danger');
          message =
            incoming.message !== ''
              ? incoming.message
              : this.getExceptionMessage(incoming.exception);
        } else if (incoming.code > 300) {
          css.push('alert-warning');
          icon.value = 'shield-exclamation';
          icon.css.push('text-warning');
        }

        this.alert = {
          title: title,
          text: message,
          css: css,
          titleCss: [],
          icon: icon as IIcon,
        };
        this.cdr.detectChanges();

        if (incoming.autoClose !== undefined) {
          setTimeout(() => {
            if (this.alert) {
              this.alert = {
                ...this.alert,
                css: [
                  ...(this.alert.css ?? []),
                  'animate__animated animate__zoomOut animate__faster',
                ],
              };
            }
            // TODO this ideia wont work, the null is required, animate leaves in the dom,
            // does not destroy the html or d-none, opacity/position only
            this.alert = null;
            this.cdr.detectChanges();
          }, incoming.autoClose);
        }
      });
  }

  getExceptionMessage(
    exception:
      | {
          message: string;
          file?: string;
          line?: number;
          errors?: string[];
        }
      | undefined
  ): string {
    let message = '';
    if (!exception) {
      return message;
    }
    if (exception.file) {
      message += `Detected @${exception.file}`;
      if (exception.line) {
        message += `:${exception.line} :: `;
      }
    }
    if (exception.message) {
      message += `${exception.message} \n`;
    }
    if (exception.errors) {
      message += `Errors: ${exception.errors.join(', ')} `;
    }

    return message;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
