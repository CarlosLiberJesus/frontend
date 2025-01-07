import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { IAccordion } from 'src/modules/elements/navigation/accordion/accordion';
import { ITabs } from 'src/modules/elements/navigation/tabs/tabs';

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.component.html',
  styleUrl: './documentacao.component.scss',
})
export class DocumentacaoComponent implements OnInit, AfterViewInit {
  @ViewChild('admin', { read: TemplateRef })
  admin!: TemplateRef<HTMLElement>;
  @ViewChild('nacional', { read: TemplateRef })
  nacional!: TemplateRef<HTMLElement>;
  @ViewChild('distrito', { read: TemplateRef })
  distrito!: TemplateRef<HTMLElement>;
  @ViewChild('concelho', { read: TemplateRef })
  concelho!: TemplateRef<HTMLElement>;
  @ViewChild('freguesia', { read: TemplateRef })
  freguesia!: TemplateRef<HTMLElement>;

  horizontalAccordion!: ITabs;
  mobileAccordion!: IAccordion;

  activeBanner:
    | 'banner-admin'
    | 'banner-nacional'
    | 'banner-distrito'
    | 'banner-concelho'
    | 'banner-freguesia' = 'banner-admin';

  constructor(
    private pageService: PageService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Documentação',
      items: [
        {
          label: 'Inicio',
          link: this.userService.getUser() ? '/inicio' : '/',
        },
        {
          label: 'Documentação',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);
  }

  ngAfterViewInit(): void {
    this.startHorizontalAccordion();
  }

  startHorizontalAccordion(): void {
    this.horizontalAccordion = {
      cssUl: ['fs-5', 'flex-column', 'nav-pills', 'border-0 border-bottom'],
      tab: [
        {
          title: 'Administração',
          content: this.admin,
          css: ['mb-1', 'me-0'],
          cssLink: [
            'active',
            'h2',
            'rounded-0',
            'btn',
            'hover-elevate-up',
            'd-flex',
            'justify-content-center',
            'btn-flex',
            'text-capan',
            'bg-ancap',
          ],
          cssPane: ['text-capan', 'bg-ancap', 'min-h-100'],
        },
        {
          title: 'Nacional',
          content: this.nacional,
          css: ['mb-1', 'me-0'],
          cssLink: [
            'h2',
            'rounded-0',
            'w-100',
            'btn',
            'hover-elevate-up',
            'd-flex',
            'justify-content-center',
            'btn-flex',
            'text-ancap',
            'bg-capan',
          ],
          cssPane: ['text-ancap', 'bg-capan', 'min-h-100'],
        },
        {
          title: 'Distrito',
          content: this.distrito,
          css: ['mb-1', 'me-0'],
          cssLink: [
            'h2',
            'btn',
            'rounded-0',
            'w-100',
            'hover-elevate-up',
            'd-flex',
            'justify-content-center',
            'btn-flex',
            'text-capan',
            'bg-gray-700',
          ],
          cssPane: ['bg-gray-700', 'min-h-100'],
        },
        {
          title: 'Concelho',
          content: this.concelho,
          css: ['mb-1', 'me-0'],
          cssLink: [
            'h2',
            'btn',
            'rounded-0',
            'w-100',
            'hover-elevate-up',
            'd-flex',
            'justify-content-center',
            'btn-flex',
            'text-capan',
            'bg-gray-500',
          ],
          cssPane: ['bg-gray-500', 'min-h-100'],
        },
        {
          title: 'Freguesia',
          content: this.freguesia,
          css: ['me-0'],
          cssLink: [
            'h2',
            'btn',
            'rounded-0',
            'w-100',
            'hover-elevate-up',
            'btn-flex',
            'd-flex',
            'justify-content-center',
            'text-capan',
            'bg-gray-300',
          ],
          cssPane: ['bg-gray-300', 'min-h-100'],
        },
      ],
    };

    this.mobileAccordion = {
      cssPane: ['accordion-collapse', 'collapse'],
      tab: [
        {
          css: ['bg-ancap'],
          title: 'Administração',
          cssLink: [
            'active',
            'h3',
            'fs-4',
            'fw-semibold',
            'text-capan',
            'bg-ancap',
          ],
          cssHeader: ['h3'],
          content: this.admin,
        },
        {
          title: 'Nacional',
          css: ['bg-capan', 'text-ancap'],
          cssLink: ['h3', 'fs-4', 'fw-semibold', 'bg-capan', 'text-ancap'],
          cssHeader: ['h3', 'text-ancap'],
          content: this.nacional,
        },
        {
          title: 'Distrito',
          css: ['bg-gray-700'],
          cssLink: ['h3', 'fs-4', 'fw-semibold', 'text-capan', 'bg-gray-700'],
          cssHeader: ['h3'],
          content: this.distrito,
        },
        {
          title: 'Concelho',
          css: ['bg-gray-500'],
          cssLink: ['h3', 'fs-4', 'fw-semibold', 'text-capan', 'bg-gray-500'],
          cssHeader: ['h3'],
          content: this.concelho,
        },
        {
          title: 'Freguesia',
          css: ['bg-gray-300'],
          cssLink: ['h3', 'fs-4', 'fw-semibold', 'text-capan', 'bg-gray-300'],
          cssHeader: ['h3'],
          content: this.freguesia,
        },
      ],
    };
    this.cdr.detectChanges();
  }
}
