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
import { IHorizontalAccordion } from 'src/modules/elements/navigation/horizontal-accordion/horizontal-accordion';

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

  horizontalAccordion!: IHorizontalAccordion;

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
      tab: [
        {
          title: 'Administração',
          content: this.admin,
          cssLink: ['active', 'h2'],
          cssHeader: ['h2'],
        },
        {
          title: 'Nacional',
          content: this.nacional,
          cssLink: ['h2'],
          cssHeader: ['h2'],
        },
        {
          title: 'Distrito',
          content: this.distrito,
          cssLink: ['h2'],
          cssHeader: ['h2'],
        },
        {
          title: 'Concelho',
          content: this.concelho,
          cssLink: ['h2'],
          cssHeader: ['h2'],
        },
        {
          title: 'Freguesia',
          content: this.freguesia,
          cssLink: ['h2'],
          cssHeader: ['h2'],
        },
      ],
    };
    this.cdr.detectChanges();
  }
}
