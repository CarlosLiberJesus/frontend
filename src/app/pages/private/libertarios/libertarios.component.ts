import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { IPagination } from 'src/app/lib/interfaces/api-response';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { IUsers } from 'src/app/lib/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { EPosition } from 'src/modules/elements/elements';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IButton } from 'src/modules/elements/html/button/button';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';
import { ITable } from 'src/modules/elements/html/table/table';

@Component({
  selector: 'app-libertarios',
  templateUrl: './libertarios.component.html',
  styleUrl: './libertarios.component.scss',
})
export class LibertariosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tools', { read: TemplateRef })
  tools!: TemplateRef<HTMLElement>;
  @ViewChild('rowTemplate', { read: TemplateRef })
  rowTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('cardTemplate', { read: TemplateRef })
  cardTemplate!: TemplateRef<HTMLElement>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  breadcrumb: IAppBreadcrumb = {
    title: 'Lista Libertários',
    items: [
      {
        label: 'Libertários',
      },
    ],
  };

  search: FormControl = new FormControl('');
  searchInput: IInput = {
    name: 'search-user',
    type: EInputType.TEXT,
    placeholder: 'Pesquisar',
    cssInputContainer: ['ms-3', 'ms-lg-6', 'position-relative'],
    icon: {
      icon: {
        library: 'bi',
        value: 'bi-search',
        css: ['fs-3'],
      },
      position: EPosition.LEFT,
    },
  };

  loading: ISpinner = {
    name: 'table-loading',
    cssContainer: ['my-5', 'fs-4'],
    placeholder: {
      text: 'Recolhendo as informações',
    },
    animation: {
      text: '...',
      css: [
        'animate__animated animate__lightSpeedInLeft animate__normal animate__infinite',
      ],
    },
  };

  detailsButton: IButton = {
    css: [
      'btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-ancap w-35px h-35px w-md-40px h-md-40px',
    ],
    iconFirst: {
      library: 'bi',
      value: 'bi-eye',
      css: ['fs-2'],
    },
  };

  messageButton: IButton = {
    css: [
      'btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-ancap w-35px h-35px w-md-40px h-md-40px',
    ],
    iconFirst: {
      library: 'fa-regular',
      value: 'fa-envelope',
      css: ['fs-4'],
    },
  };

  table!: ITable;
  users!: IUsers | undefined;

  constructor(
    private pageService: PageService,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageService.setBreadcrumb(this.breadcrumb);
  }

  ngAfterViewInit(): void {
    this.table = {
      card: {
        css: ['card-flush'],
        header: {
          titleCss: ['fw-bold mb-1'],
          smallCss: ['fs-6 text-gray-500'],
          toolbar: ['my-1'],
        },
        body: ['pt-0'],
      },
      title: 'Libertários',
      loading: this.loading,
      notFound: 'Não foram encontrados dados',
      toolbar: this.tools,
      css: [
        'table',
        'table-switch',
        'table-row-bordered table-row-dashed gy-4 align-middle fw-bold no-footer',
      ],
      tableHeaders: {
        css: ['fs-7 text-gray-500 text-uppercase'],
        columns: [
          { name: 'Membro' },
          { name: 'Perfil' },
          { name: 'Localização' },
          { name: 'Estado' },
          { name: 'Última referência' },
          { name: 'Acções' },
        ],
      },
      rowTemplate: null,
      cardTemplate: null,
    };
    this.cdr.detectChanges();
    this.getUserList();
  }

  getUserList(data = {}): void {
    this.apiService
      .fetch<IUsers>('/users/get-all', data)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.pageService.setAlert({
            code: 500,
            title: 'Erro ao buscar dados',
            message: error.message,
          });
          return EMPTY;
        })
      )
      .subscribe(response => {
        if (response.code === 200 && response.data) {
          // Handle successful response
          this.table = {
            ...this.table,
            tableData: response.data.users,
            pagination: response.data.pagination,
            rowTemplate: this.rowTemplate,
            cardTemplate: this.cardTemplate,
          };
          this.cdr.detectChanges();
        }
      });
  }

  onSearch(_entered: boolean): void {
    const pagination = this.table.pagination ?? null;
    this.table.tableData = null;

    this.getUserList({ text: this.search.value, ...pagination });
  }

  onPaginationChange(pagination: IPagination): void {
    this.table.tableData = null;
    this.getUserList({ ...pagination });
  }

  getOnline(date: Date): string {
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - new Date(date).getTime();
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const css = [
      'position-absolute border border-4 border-body h-15px w-15px rounded-circle translate-middle start-100 top-100 ms-n1 mt-n1',
    ];
    if (diffInMinutes < 120) {
      // Date is within the last 2 hours
      css.push('bg-success');
    } else if (diffInMinutes < 1440) {
      css.push('bg-warning');
    } else if (diffInMinutes < 10080) {
      css.push('bg-danger');
    } else {
      css.push('bg-gray-200');
    }
    return css.join(' ');
  }

  onDetails(uuid: string): void {
    this.router.navigate(['/libertarios', uuid]);
  }

  onMessage(_uuid: string): void {
    this.pageService.setAlert({
      code: 301,
      title: 'TODO:: Implementar',
      message: 'Com o crescimento da app podermos mudar esta função',
    });
  }

  linkToDetails(uuid: string): boolean {
    if (this.userService.hasRole('COMEL')) {
      return true;
    } else if (this.userService.hasRole('PLTOP')) {
      return true;
    } else if (this.userService.getUser()?.uuid === uuid) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
