import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IconsModel } from './icons.model';
import { ITabs } from 'src/modules/elements/navigation/tabs/tabs';
import { IIcon, IIconFile } from 'src/modules/elements/base/icon/icon';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bootstrap-documentation-intro-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationIconsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$: Subject<boolean> = new Subject<boolean>();
  showIconsList = false;

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

  tabs!: ITabs;

  iconsList!: IIconFile | undefined;

  @ViewChild('icons', { read: TemplateRef })
  icons!: TemplateRef<HTMLElement>;
  srcCode!: string;

  constructor(
    public iconsModel: IconsModel,
    private cdr: ChangeDetectorRef
  ) {
    this.iconsModel.startForms();
  }

  ngOnInit(): void {
    this.tabs = {
      cssUl: ['nav-pills', 'nav-pills-custom', 'mb-3'].filter(Boolean),
      tab: [
        {
          title: 'Awsome Icons',
          css: ['mb-3', 'me-2', 'me-lg-5'],
          cssLink: [
            'active',
            'btn',
            'btn-outline',
            'btn-flex',
            'btn-color-muted',
            'btn-active-color-ancap',
            'flex-column',
            ' overflow-hidden',
            'w-130px',
            'h-45px',
            'pt-5',
            'pb-2',
          ],
          cssLabel: ['text-gray-800', 'fw-bold', 'fs-6', 'lh-1'],
          bullet: [
            'bullet-custom',
            'position-absolute',
            'bottom-0',
            'w-100',
            'h-4px',
            'bg-ancap',
          ],
          loading: {
            ...this.loading,
            placeholder: {
              text: this.getLoadingMessage('AwsomeIcons'),
            },
          },
        },
        {
          title: 'BI-Icons',
          css: ['mb-3', 'me-2', 'me-lg-5'],
          cssLink: [
            'btn',
            'btn-outline',
            'btn-flex',
            'btn-color-muted',
            'btn-active-color-ancap',
            'flex-column',
            'overflow-hidden',
            'w-85px',
            'h-45px',
            'pt-5',
            'pb-2',
          ],
          cssLabel: ['text-gray-800', 'fw-bold', 'fs-6', 'lh-1'],
          bullet: [
            'bullet-custom',
            'position-absolute',
            'bottom-0',
            'w-100',
            'h-4px',
            'bg-ancap',
          ],
          loading: {
            ...this.loading,
            placeholder: {
              text: this.getLoadingMessage('BI-Icons'),
            },
          },
        },
        {
          title: 'Social Icons',
          css: ['mb-3', 'me-2', 'me-lg-5'],
          cssLink: [
            'btn',
            'btn-outline',
            'btn-flex',
            'btn-color-muted',
            'btn-active-color-ancap',
            'flex-column',
            'overflow-hidden',
            'w-120px',
            'h-45px',
            'pt-5',
            'pb-2',
          ],
          cssLabel: ['text-gray-800', 'fw-bold', 'fs-6', 'lh-1'],
          bullet: [
            'bullet-custom',
            'position-absolute',
            'bottom-0',
            'w-100',
            'h-4px',
            'bg-ancap',
          ],
          loading: {
            ...this.loading,
            placeholder: {
              text: this.getLoadingMessage('SocialIcons'),
            },
          },
        },
        {
          title: 'Flags',
          css: ['mb-3', 'me-2', 'me-lg-5'],
          cssLink: [
            'btn',
            'btn-outline',
            'btn-flex',
            'btn-color-muted',
            'btn-active-color-ancap',
            'flex-column',
            'overflow-hidden',
            'w-60px',
            'h-45px',
            'pt-5',
            'pb-2',
          ],
          cssLabel: ['text-gray-800', 'fw-bold', 'fs-6', 'lh-1'],
          bullet: [
            'bullet-custom',
            'position-absolute',
            'bottom-0',
            'w-100',
            'h-4px',
            'bg-ancap',
          ],
          loading: {
            ...this.loading,
            placeholder: {
              text: this.getLoadingMessage('Flags'),
            },
          },
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.onTabChange(0);
  }

  onTabChange(tab: number): void {
    this.iconsList = undefined;
    const updatedTabs = this.tabs.tab.map((tabItem, index) => {
      if (index === tab) {
        return {
          ...tabItem,
          content: undefined,
        };
      } else {
        return tabItem;
      }
    });

    this.tabs = {
      ...this.tabs,
      tab: updatedTabs,
    };
    if (tab === 0) {
      const translatedString = 'A carregar {0} ícones';
      let replacedString = '';
      let number: number = 1405;

      switch (this.iconsModel.getControl('styles').value) {
        case 'solid':
          break;
        case 'regular':
          number = 163;
          break;
        case 'brands':
          number = 490;
          break;
        default:
          break;
      }

      replacedString = translatedString.replace('{0}', number.toString());
      this.tabs = {
        ...this.tabs,
        tab: [
          ...this.tabs.tab.slice(0, 0), // Copy elements before index 0
          {
            ...this.tabs.tab[0],
            loading: {
              ...this.loading,
              placeholder: {
                text: replacedString,
              },
            },
          },
          ...this.tabs.tab.slice(1), // Copy elements after index 0
        ],
      };
      this.cdr.detectChanges();
    }

    this.cdr.detectChanges();
    setTimeout(() => {
      let iconQuery;
      const style: string = this.iconsModel.getControl('styles').value;
      if (style === 'solid') {
        iconQuery = this.iconsModel
          .getFontawesomeIconsSolidList()
          .pipe(takeUntil(this.destroy$));
      } else if (style === 'regular') {
        iconQuery = this.iconsModel
          .getFontawesomeIconsRegularList()
          .pipe(takeUntil(this.destroy$));
      } else {
        iconQuery = this.iconsModel
          .getFontawesomeIconsBrandsList()
          .pipe(takeUntil(this.destroy$));
      }

      switch (tab) {
        case 0:
          this.showLoading(0);

          iconQuery.subscribe((iconsList: IIconFile) => {
            this.iconsList = iconsList;

            this.tabs.tab[0].content = this.icons;
            this.tabs = {
              ...this.tabs,
              tab: [
                ...this.tabs.tab.slice(0, 0), // Copy elements before index 0
                {
                  ...this.tabs.tab[0],
                  content: this.icons,
                },
                ...this.tabs.tab.slice(1), // Copy elements after index 0
              ],
            };
            this.cdr.detectChanges();
          });
          break;
        case 1:
          this.showLoading(1);
          this.iconsModel
            .getBootstrapIconsList()
            .pipe(takeUntil(this.destroy$))
            .subscribe(iconsList => {
              this.iconsList = iconsList;
              this.tabs = {
                ...this.tabs,
                tab: [
                  ...this.tabs.tab.slice(0, 1), // Copy elements before index 1
                  {
                    ...this.tabs.tab[1],
                    content: this.icons,
                  },
                  ...this.tabs.tab.slice(2), // Copy elements after index 1
                ],
              };
              this.cdr.detectChanges();
            });
          break;
        case 2: //SocialIcons
          this.showLoading(2);
          this.iconsModel
            .getSocialIconsList()
            .pipe(takeUntil(this.destroy$))
            .subscribe(iconsList => {
              this.iconsList = iconsList;
              this.tabs = {
                ...this.tabs,
                tab: [
                  ...this.tabs.tab.slice(0, 2), // Copy elements before index 2
                  {
                    ...this.tabs.tab[2],
                    content: this.icons,
                  },
                  ...this.tabs.tab.slice(3), // Copy elements after index 2
                ],
              };
              this.cdr.detectChanges();
            });
          break;
        case 3:
          this.showLoading(3);
          this.iconsModel
            .getFlagsList()
            .pipe(takeUntil(this.destroy$))
            .subscribe(iconsList => {
              this.iconsList = iconsList;
              this.tabs = {
                ...this.tabs,
                tab: [
                  ...this.tabs.tab.slice(0, 3), // Copy elements before index 2
                  {
                    ...this.tabs.tab[3],
                    content: this.icons,
                  },
                ],
              };
              this.cdr.detectChanges();
            });
      }
    }, 1);
  }

  getLoadingMessage(tab: string): string {
    const translatedString = 'A carregar {0} ícones';
    let replacedString = '';

    switch (tab) {
      case 'AwsomeIcons':
        replacedString = translatedString.replace('{0}', (163).toString());
        break;
      case 'BI-Icons':
        replacedString = translatedString.replace('{0}', (2050).toString());
        break;
      case 'SocialIcons':
        replacedString = translatedString.replace('{0}', (166).toString());
        break;
      case 'Flags':
        replacedString = translatedString.replace('{0}', (261).toString());
        break;
    }

    return replacedString;
  }

  showLoading(tabIndex: number): void {
    this.tabs.tab[tabIndex].content = undefined;
    this.cdr.detectChanges();
  }

  getActiveTab(): number {
    let result = 0;
    for (const [index, tab] of this.tabs.tab.entries()) {
      if (tab.cssLink?.includes('active')) {
        result = index;
        break; // Exit loop once the 'active' tab is found
      }
    }
    return result;
  }

  getIcon(value: string): IIcon {
    let icon!: IIcon;

    switch (this.getActiveTab()) {
      case 0:
        icon = {
          library: 'fa-' + this.iconsModel.getControl('styles').value,
          value: 'fa-' + value,
          css: [
            this.iconsModel.getLetterSizeOptions().valuesList[
              +this.iconsModel.getValue('letterSize')
            ],
            this.iconsModel.getValue('color')
              ? this.iconsModel.getValue('color') + ''
              : '',
          ].filter(Boolean),
        };
        break;
      case 1:
        icon = {
          library: 'bi',
          value: 'bi-' + value,
          css: [
            this.iconsModel.getLetterSizeOptions().valuesList[
              +this.iconsModel.getValue('letterSize')
            ],
            this.iconsModel.getValue('color')
              ? this.iconsModel.getValue('color') + ''
              : '',
          ].filter(Boolean),
        };
        break;
      case 2:
        icon = {
          library: 'socicon',
          value: 'socicon-' + value,
          css: [
            this.iconsModel.getLetterSizeOptions().valuesList[
              +this.iconsModel.getValue('letterSize')
            ],
            this.iconsModel.getValue('color')
              ? this.iconsModel.getValue('color') + ''
              : '',
          ].filter(Boolean),
        };
        break;
      case 3:
        icon = {
          library: 'flag',
          value: value,
          css: [
            this.iconsModel.getFlagSizeOptions().valuesList[
              +this.iconsModel.getValue('flagSize')
            ],
          ],
        };
        break;
    }

    return icon;
  }

  onChanged() {
    this.srcCode = '';
    this.onTabChange(this.getActiveTab());
  }

  onIconClick(value: string): void {
    this.srcCode = '\n IICon = ' + JSON.stringify(this.getIcon(value), null, 2);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
