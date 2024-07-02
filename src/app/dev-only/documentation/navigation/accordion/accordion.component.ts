import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IAccordion } from 'src/modules/elements/navigation/accordion/accordion';
import { AccordionModel } from './accordion.model';

@Component({
  selector: 'app-bootstrap-documentation-navigation-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationAccordionComponent implements AfterViewInit {
  @ViewChild('customTabOne', { read: TemplateRef })
  customTabOne!: TemplateRef<HTMLElement>;
  @ViewChild('customTabTwo', { read: TemplateRef })
  customTabTwo!: TemplateRef<HTMLElement>;
  @ViewChild('customTabThree', { read: TemplateRef })
  customTabThree!: TemplateRef<HTMLElement>;

  accordion!: IAccordion;
  srcCode!: string;

  constructor(
    private cdr: ChangeDetectorRef,
    public accordionModel: AccordionModel
  ) {
    this.accordionModel.startForms();
  }

  ngAfterViewInit(): void {
    this.startAccordion();
  }

  startAccordion(): void {
    const accordion: IAccordion = {
      tab: [
        {
          title: 'Tab 1',
          content: this.customTabOne,
          cssLink: ['active', 'h3'],
          cssHeader: ['h3'],
        },
        {
          title: 'Tab 2',
          content: this.customTabTwo,
          cssLink: ['h3'],
          cssHeader: ['h3'],
        },
        {
          title: 'Tab 3',
          content: this.customTabThree,
          cssLink: ['h3'],
          cssHeader: ['h3'],
        },
      ],
    };

    if (this.accordionModel.getValue('style') === 'one') {
      accordion.tab.map(item => {
        item.cssLink?.push('fs-4', 'fw-semibold', 'text-capan');
      });
      accordion.cssPane = ['accordion-collapse', 'collapse'];
    } else {
      accordion.css = ['accordion-flush'];
      accordion.cssPane = ['fs-6', 'collapse', 'ps-10'];
      accordion.tab.map(item => {
        item.css = ['mb-5'];
        item.cssHeader = ['d-flex', 'py-3'];
        item.cssLink?.push('fs-4', 'fw-semibold', 'mb-0', 'ms-4');
      });

      if (this.accordionModel.getValue('style') === 'two') {
        accordion.css.push('accordion-icon-toggle');
        accordion.icon = {
          library: 'bi',
          value: 'bi-chevron-right',
          css: ['fs-4', 'text-ancap'],
        };
      }
      if (this.accordionModel.getValue('style') === 'three') {
        accordion.css.push('accordion-icon-collapse');
        accordion.icon = {
          library: 'fa-regular',
          value: 'fa-square-plus',
          css: ['fs-3', 'accordion-icon-off', 'text-ancap'],
        };
        accordion.iconAux = {
          library: 'fa-regular',
          value: 'fa-square-minus',
          css: ['fs-3', 'accordion-icon-on', 'text-ancap'],
        };
      }
    }

    this.accordion = accordion;

    this.srcCode =
      '\nIAccordion = ' +
      JSON.stringify(this.removeContent(accordion), null, 2);
    this.cdr.detectChanges();
  }

  removeContent(accordion: IAccordion) {
    return {
      css: accordion.css?.filter(Boolean),
      cssPane: accordion.cssPane?.filter(Boolean),
      tab: accordion.tab.map(item => {
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

  onChange() {
    this.startAccordion();
  }
}
