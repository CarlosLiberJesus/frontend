import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ISeparator } from 'src/modules/elements/html/separator/separator';
import { SeparatorModel } from './separator.model';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-html-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationSeparatorComponent implements OnInit {
  srcCode!: string;
  separator!: ISeparator;

  typeOptions!: IRadioList;

  constructor(public separatorModel: SeparatorModel) {
    this.separatorModel.startForms();
  }

  ngOnInit(): void {
    this.typeOptions = this.separatorModel.getTypeOptions();
    this.getSeparator();
  }

  getSeparator() {
    const separator: ISeparator = {
      css: [],
    };
    if (+this.separatorModel.getValue('size') !== 0) {
      separator.css?.push(
        'border-' + this.separatorModel.getValue('size') + ''
      );
    }
    if (+this.separatorModel.getValue('padding') !== 0) {
      separator.css?.push('my-' + this.separatorModel.getValue('padding') + '');
    }
    if (this.separatorModel.getValue('color')) {
      separator.css?.push(
        'border-' + this.separatorModel.getValue('color') + ''
      );
    }
    if (this.separatorModel.getValue('style') !== 'separator-solid') {
      separator.css?.push(this.separatorModel.getValue('style') + '');
    }
    if (this.separatorModel.getValue('toggle')) {
      separator.css?.push('separator-content');
      if (this.separatorModel.getValue('type') === 'text') {
        separator.label = this.separatorModel.getValue('text');
        separator.labelCss = [
          'fw-bold',
          'text-' + this.separatorModel.getValue('color'),
        ];
      }
      if (this.separatorModel.getValue('type') === 'icon') {
        separator.icon = {
          library: 'fa-regular',
          value: 'fa-star-half-stroke',
          css: ['fs-2qx', 'text-' + this.separatorModel.getValue('color')],
        };
      }
    }

    this.separator = separator;
    this.srcCode = '\nISeparator = ' + JSON.stringify(separator, null, 2);
  }

  onChanged() {
    this.getSeparator();
  }
}
