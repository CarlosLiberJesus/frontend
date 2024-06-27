import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ITabs } from 'src/modules/elements/navigation/tabs/tabs';
import { TabsModel } from './tabs.model';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-navigation-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationTabsComponent implements OnInit, AfterViewInit {
  @ViewChild('customTabOne', { read: TemplateRef })
  customTabOne!: TemplateRef<HTMLElement>;
  @ViewChild('customTabTwo', { read: TemplateRef })
  customTabTwo!: TemplateRef<HTMLElement>;
  @ViewChild('customTabThree', { read: TemplateRef })
  customTabThree!: TemplateRef<HTMLElement>;

  tabs!: ITabs;
  srcCode!: string;

  tabsOptions!: ICheckBoxList;
  directionOptions!: IRadioList;

  constructor(
    private cdr: ChangeDetectorRef,
    public tabsModel: TabsModel
  ) {
    this.tabsModel.startForms();
  }

  ngOnInit(): void {
    this.tabsOptions = this.tabsModel.getTabsOptions();
    this.directionOptions = this.tabsModel.getDirectionOptions();
  }

  ngAfterViewInit(): void {
    this.startTabs();
  }

  startTabs(): void {
    const tabs: ITabs = {
      cssUl: [
        'mb-5',
        'fs-6',
        this.tabsModel.getValue('direction') ?? '',
        ...this.getOptions(),
      ].filter(Boolean),
      tab: [
        {
          title: 'Tab 1',
          content: this.customTabOne,
          cssLink: ['active'],
        },
        {
          title: 'Tab 2',
          content: this.customTabTwo,
        },
        {
          title: 'Tab 3',
          content: this.customTabThree,
        },
      ],
    };
    if (this.tabsModel.getFormArrayValue('tabsOptions').includes('disabled')) {
      tabs.tab[2].cssLink = ['disabled'];
    }

    this.tabs = tabs;
    this.srcCode =
      '\nITabs = ' + JSON.stringify(this.removeContent(tabs), null, 2);
    this.cdr.detectChanges();
  }

  removeContent(tabs: ITabs) {
    return {
      cssUl: tabs.cssUl?.filter(Boolean),
      cssPane: tabs.cssPane?.filter(Boolean),
      tab: tabs.tab.map(item => {
        const { content, ...rest } = item;
        const serializedContent = this.stringifyTemplateRef(content);
        return { ...rest, content: serializedContent };
      }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringifyTemplateRef(content: any): string {
    if (content instanceof TemplateRef) {
      return 'TemplateRef<HTMLElement>';
    }
    return JSON.stringify(content);
  }

  getOptions(): string[] {
    const classes: string[] = [];
    this.tabsModel.getFormArrayValue('tabsOptions').map((cssClass: string) => {
      switch (cssClass) {
        case 'disabled':
          // this.isDisabled = true;
          break;
        case 'nav-pills':
        case 'nav-fill':
        case 'nav-justified':
        case 'nav-line-tabs':
        case 'border-transparent':
          classes.push(cssClass);
          break;
      }
    });

    return classes;
  }

  onChange() {
    this.startTabs();
  }
}
