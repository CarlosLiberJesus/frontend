import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { IButton } from 'src/modules/elements/html/button/button';

@Component({
  selector: 'app-documentation-elements',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent implements OnInit, OnDestroy {
  slug!: string; // First part of the url, ex: localhost:4200/dev-only
  urlChoices: { main: string; element: string } = {
    main: 'intro',
    element: 'intro',
  }; // starts with forced values, its the #intro#intro

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  /**
   * Called when the component is initialized
   * Calls the url from the browser and tries to parse it
   */
  ngOnInit(): void {
    this.route.fragment
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((fragment: null | string) => {
        this.slug = window.location.pathname;
        if (fragment) {
          const parts = fragment.split('#');
          if (parts) {
            this.urlChoices = {
              main: parts[0],
              element: parts[1],
            };
          }
          this.cdr.detectChanges();
        }
        const breadcrumb: IAppBreadcrumb = {
          title: 'Documentação Bootstrap',
          items: [
            {
              label: 'Inicio',
              link: '/',
            },
          ],
        };

        if (this.urlChoices.main) {
          breadcrumb.items?.push({
            label: this.urlChoices.main,
            link: this.slug,
            fragment: this.urlChoices.main,
          });
        }

        if (this.urlChoices.element) {
          breadcrumb.items?.push({
            label: this.urlChoices.element,
            link: this.slug,
            fragment: this.urlChoices.main + '#' + this.urlChoices.element,
          });
        }
        this.pageService.setBreadcrumb(breadcrumb);
      });
  }

  getMainMenuListClass(): string {
    return 'col-lg-12 col-xl-5 col-xxl-4 flex-wrap d-flex align-items-center justify-content-start mt-md-3';
  }

  getSubMenuListClass(): string {
    return 'col-lg-12 col-xl-7 col-xxl-8 d-flex flex-wrap align-items-center justify-content-start elements';
    //TODO +'elements-' + localStorage.getItem('theme') ?? 'light'
  }

  getMainMenuList(): { slug: string; button: IButton }[] {
    return [
      {
        slug: 'intro',
        button: {
          text: 'Introdução',
          css: ['d-flex', this.getMainMenuActiveClass('intro')],
        },
      },
      {
        slug: 'html',
        button: {
          text: 'HTML',
          css: ['d-flex', this.getMainMenuActiveClass('html')],
        },
      },
      {
        slug: 'navegacao',
        button: {
          text: 'Navegação',
          css: ['d-flex', 'd-flex', this.getMainMenuActiveClass('navegacao')],
        },
      },
      {
        slug: 'formularios',
        button: {
          text: 'Formulários',
          css: ['d-flex', this.getMainMenuActiveClass('formularios')],
        },
      },
    ];
  }

  getIntroSubMenuList(): { slug: string; button: IButton }[] {
    return [
      {
        slug: 'grelha',
        button: {
          text: 'Grelha',
          css: [
            'd-flex',
            this.urlChoices?.element === 'grelha'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'cores',
        button: {
          text: 'Cores',
          css: [
            'd-flex',
            this.urlChoices?.element === 'cores'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'tamanhos',
        button: {
          text: 'Tamanhos',
          css: [
            'd-flex',
            this.urlChoices?.element === 'tamanhos'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'fontes',
        button: {
          text: 'Fontes',
          css: [
            'd-flex',
            this.urlChoices?.element === 'fontes'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'margens',
        button: {
          text: 'Margens',
          css: [
            'd-flex',
            this.urlChoices?.element === 'margens'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-border',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'margens'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'icons',
        button: {
          text: 'Icons',
          css: [
            'd-flex',
            this.urlChoices?.element === 'icons'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'animacoes',
        button: {
          text: 'Animações',
          css: [
            'd-flex',
            this.urlChoices?.element === 'animacoes'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
    ];
  }

  getHtmlSubMenuList(): { slug: string; button: IButton }[] {
    return [
      {
        slug: 'avatar',
        button: {
          text: 'Avatar',
          css: [
            'd-flex',
            this.urlChoices?.element === 'avatar'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'marcadores',
        button: {
          text: 'Marcadores',
          css: [
            'd-flex',
            this.urlChoices?.element === 'marcadores'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-list-ul',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'marcadores'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'separador',
        button: {
          text: 'Separador',
          css: [
            'd-flex',
            this.urlChoices?.element === 'separador'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'cracha',
        button: {
          text: 'Cracha',
          css: [
            'd-flex',
            this.urlChoices?.element === 'cracha'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'giratorio',
        button: {
          text: 'Giratório',
          css: [
            'd-flex',
            this.urlChoices?.element === 'giratorio'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'mensagens',
        button: {
          text: 'Mensagens',
          css: [
            'd-flex',
            this.urlChoices?.element === 'mensagens'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-chat',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'mensagens'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'botao',
        button: {
          text: 'Botão',
          css: [
            'd-flex',
            this.urlChoices?.element === 'botao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'alerta',
        button: {
          text: 'Alerta',
          css: [
            'd-flex',
            this.urlChoices?.element === 'alerta'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'cartao',
        button: {
          text: 'Cartão',
          css: [
            'd-flex',
            this.urlChoices?.element === 'cartao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-journal-text',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'cartao'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'paginacao',
        button: {
          text: 'Paginação',
          css: [
            'd-flex',
            this.urlChoices?.element === 'paginacao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-123',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'paginacao'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'tabela',
        button: {
          text: 'Tabela',
          css: [
            'd-flex',
            this.urlChoices?.element === 'tabela'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-table',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'tabela'
                ? 'text-white'
                : '',
            ],
          },*/
        },
      },
    ];
  }

  getNavegacaoSubMenuList(): { slug: string; button: IButton }[] {
    return [
      {
        slug: 'abas',
        button: {
          text: 'Abas',
          css: [
            'd-flex',
            this.urlChoices?.element === 'abas'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /*
          iconLast: {
            library: 'bi',
            value: 'bi-list-ul',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'abas'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'acordiao',
        button: {
          text: 'Acordião',
          css: [
            'd-flex',
            this.urlChoices?.element === 'acordiao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /*
          iconLast: {
            library: 'bi',
            value: 'bi-list-ol',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'acordiao'
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'trilhas',
        button: {
          text: 'Trilhas',
          css: [
            'd-flex',
            this.urlChoices?.element === 'trilhas'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /*iconLast: {
            library: 'bi',
            value: 'bi-three-dots',
            css: [
              'fs-3',
              'ms-2',
              this.urlChoices?.element === 'trilhas'
                ? 'text-white'
                : '',
            ],
          },*/
        },
      },
      {
        slug: 'menu',
        button: {
          text: 'Menú',
          css: [
            'd-flex',
            this.urlChoices?.element === 'menu'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'carrossel',
        button: {
          text: 'Carrossel',
          css: [
            'd-flex',
            this.urlChoices?.element === 'carrossel'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-arrow-clockwise',
            css: [
              'fs-3',
              'ms-2',
              ['carousel', 'carrossel'].includes(this.option?.secondary)
                ? 'text-white'
                : '',
            ],
          },*/
        },
      },
    ];
  }

  getFormulariosSubMenuList(): { slug: string; button: IButton }[] {
    return [
      {
        slug: 'interuptor',
        button: {
          text: 'Interuptor',
          css: [
            'd-flex',
            this.urlChoices?.element === 'interuptor'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'texto',
        button: {
          text: 'Texto',
          css: [
            'd-flex',
            this.urlChoices?.element === 'texto'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'grupo',
        button: {
          text: 'Grupo Butões',
          css: [
            'd-flex',
            this.urlChoices?.element === 'grupo'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'radio',
        button: {
          text: 'Radios',
          css: [
            'd-flex',
            this.urlChoices?.element === 'radio'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-ui-radios-grid',
            css: [
              'fs-3',
              'ms-2',
              this.option?.secondary === 'radio' ? 'text-white' : '',
            ],
          }, */
        },
      },
      {
        slug: 'caixa-selecao',
        button: {
          text: 'Caixa de Selecção',
          css: [
            'd-flex',
            this.urlChoices?.element === 'caixa-selecao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-ui-checks',
            css: [
              'fs-3',
              'ms-2',
              ['check-box', 'caixa-selecao'].includes(this.option?.secondary)
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'selecao',
        button: {
          text: 'Selecção',
          css: [
            'd-flex',
            this.urlChoices?.element === 'selecao'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /* iconLast: {
            library: 'bi',
            value: 'bi-arrow-down-square',
            css: [
              'fs-3',
              'ms-2',
              ['select', 'selecao'].includes(this.option?.secondary)
                ? 'text-white'
                : '',
            ],
          }, */
        },
      },
      {
        slug: 'selecao-multipla',
        button: {
          text: 'Selecção Multipla',
          css: [
            'd-flex',
            this.urlChoices?.element === 'selecao-multipla'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'area-texto',
        button: {
          text: 'Area de Texto',
          css: [
            'd-flex',
            this.urlChoices?.element === 'area-texto'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /*iconLast: {
            library: 'bi',
            value: 'bi-textarea',
            css: [
              'fs-3',
              'ms-2',
              ['textarea', 'area-texto'].includes(this.option?.secondary)
                ? 'text-white'
                : '',
            ],
          },*/
        },
      },
      {
        slug: 'intervalo',
        button: {
          text: 'Intervalo',
          css: [
            'd-flex',
            this.urlChoices?.element === 'intervalo'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
        },
      },
      {
        slug: 'grupo-butoes',
        button: {
          text: 'Grupos de Butoes',
          css: [
            'd-flex',
            this.urlChoices?.element === 'grupo-butoes'
              ? 'btn-bg-capan btn-text-ancap fw-bold'
              : 'btn-active-light-capan',
          ],
          /*iconLast: {
            library: 'bi',
            value: 'bi-diagram-3',
            css: [
              'fs-3',
              'ms-2',
              ['button-group', 'grupo-butoes'].includes(this.option?.secondary)
                ? 'text-white'
                : '',
            ],
          },*/
        },
      },
    ];
  }

  getMainMenuActiveClass(main: string): string {
    if (this.urlChoices?.main === main) {
      return 'btn-bg-capan btn-text-ancap fw-bold';
    } else {
      return 'btn-active-dark';
    }
  }

  showIfMainMenu(main: string): string {
    if (this.urlChoices?.main === main) {
      return 'd-block';
    } else {
      return 'd-none';
    }
  }

  changeSection(_event: boolean, fragment: string): void {
    this.urlChoices.main = fragment;
  }

  forwardSection(_event: boolean, fragment: string): void {
    this.urlChoices.element = fragment;

    this.router.navigate([this.slug], {
      fragment: this.urlChoices.main + '#' + this.urlChoices.element,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
