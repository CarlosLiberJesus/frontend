import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IApiResponse } from 'src/app/lib/interfaces/api-response';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { IUser } from 'src/app/lib/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';

@Component({
  selector: 'app-libertario',
  templateUrl: './libertario.component.html',
  styleUrl: './libertario.component.scss',
})
export class LibertarioComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  formGroup: FormGroup = new FormGroup({
    public: new FormControl(''),
  });

  isSameUser = false;
  activePane = 'details';
  userUuid: string | null = '';
  libertario: IUser;

  loading: ISpinner = {
    name: 'table-loading',
    cssContainer: ['my-5', 'fs-4'],
    placeholder: {
      text: '',
    },
    animation: {
      text: '...',
      css: [
        'animate__animated animate__lightSpeedInLeft animate__normal animate__infinite',
      ],
    },
  };

  pulicToggle: IToggle = this.getPublicToggle();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private pageService: PageService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userUuid = this.route.snapshot.paramMap.get('id');
    if (!this.userUuid) {
      this.pageService.setAlert({
        code: 500,
        title: 'Erro:: Acesso à Página',
        message: 'Era expectado um ID de Usuário',
      });
      this.router.navigate(['/inicio']);
    }

    if (this.userUuid === this.userService.getUser()?.uuid) {
      this.isSameUser = true;
      this.libertario = this.userService.getUser() as IUser;
    }

    const breadcrumb: IAppBreadcrumb = {
      title: 'Libertário Detalhe',
      items: [],
    };

    if (this.isSameUser) {
      if (this.hasRole('NO-PL')) {
        breadcrumb.items?.push({
          label: 'Libertário',
        });
      } else {
        breadcrumb.items?.push({
          label: 'Libertários',
          link: '/libertarios',
        });
      }
      breadcrumb.items?.push({
        label:
          (this.hasRole('NO-PL') ? 'Liberal' : 'Libertário') +
          ' ' +
          this.libertario.firstname +
          ' ' +
          this.libertario.lastname,
      });
    } else {
      if (this.userUuid) {
        this.loading = {
          ...this.loading,
          placeholder: {
            text: 'Carregando Membro ' + this.userUuid,
          },
        };
        this.apiService
          .fetch<IUser>('/users/get', { uuid: this.userUuid })
          .pipe(takeUntil(this.destroy$))
          .subscribe((user: IApiResponse<IUser>) => {
            if (user.code === 200 && user.data) {
              this.libertario = user.data;
              if (this.userService.hasRole('NO-PL')) {
                breadcrumb.items?.push({
                  label: 'Libertário',
                });
              } else {
                breadcrumb.items?.push({
                  label: 'Libertários',
                  link: '/libertarios',
                });
              }
              breadcrumb.items?.push({
                label:
                  (this.hasRole('NO-PL') ? 'Liberal' : 'Libertário') +
                  ' ' +
                  this.libertario.firstname +
                  ' ' +
                  this.libertario.lastname,
              });
              this.pageService.setBreadcrumb(breadcrumb);
            } else {
              this.pageService.setAlert({
                code: user.code,
                title: 'Erro:: Acesso à Página',
                message:
                  user.exception?.message ??
                  'Não foi encontrado nenhum Libertário',
              });
              this.router.navigate(['/inicio']);
            }
          });
      }
    }
    this.pageService.setBreadcrumb(breadcrumb);
  }

  private getPublicToggle(): IToggle {
    return {
      name: 'publicToggle',
      css: ['gap-2', 'form-check-ancap'],
      label: {
        text: 'Público?',
        css: ['fs-6', 'fw-bold'],
      },
    };
  }
  isLibertario(): boolean {
    const hasNOPLrole = this.libertario.roles.some(
      role => role.code === 'NO-PL'
    );
    return hasNOPLrole ? false : true;
  }

  hasRole(userRole: string): boolean {
    return this.libertario.roles.some(role => role.code === userRole);
  }

  setActivePane(pane: string): void {
    this.activePane = pane;
    this.cdr.detectChanges();
  }

  getUserStatusIcon(): string {
    return 'fw-bold text-' + this.libertario.profile.status.color;
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  onChanged(): void {
    if (this.getControl('public').value) {
      this.pulicToggle = {
        ...this.pulicToggle,
        message: {
          text: 'Só Sócios podem activar Blog?',
        },
      };
    } else {
      this.pulicToggle = this.getPublicToggle();
    }
    this.setActivePane('edit');
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
