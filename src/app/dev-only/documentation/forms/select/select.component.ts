import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType } from 'src/modules/elements/forms/input/input';
import { SelectModel } from './select.model';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { EPosition } from 'src/modules/elements/elements';

@Component({
  selector: 'app-bootstrap-documentation-forms-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationSelectComponent implements OnInit {
  select!: ISelect;
  srcCode!: string;

  styles!: IRadioList;
  options!: ICheckBoxList;

  constructor(public selectModel: SelectModel) {
    this.selectModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.selectModel.getSelectOptions();
    this.styles = this.selectModel.getStylesOptions();
    this.startSelect();
  }

  startSelect(): void {
    const select: ISelect = {
      name: 'select',
      placeholder: 'Selecione uma opção',
      css: [
        'min-w-200px',
        ...this.selectModel.getFormArrayValue('selectOptions'),
      ],
      option: [],
    };

    if (select.css?.includes('icon-check')) {
      select.iconChecked = {
        library: 'ki-duotone',
        value: 'ki-check',
        css: [
          'fs-2',
          select.css?.includes('active') ? 'text-white' : '',
        ].filter(Boolean),
      };
    }

    switch (this.selectModel.getValue('styleOptions')) {
      case 'default':
        select.option = this.selectModel.getDefaultOptions();
        break;
      case 'colors':
        select.option = this.selectModel.getColorOptions();
        break;
      case 'icons':
        select.option = this.selectModel.getIconsOptions();
        break;
      case 'avatar':
        select.option = this.selectModel.getAvatarOptions();
        break;
    }

    if (this.selectModel.getFormArrayValue('selectOptions').includes('label')) {
      select.label = {
        text: this.selectModel.getValue('labelText'),
      };
    }
    if (
      this.selectModel.getFormArrayValue('selectOptions').includes('message')
    ) {
      select.message = {
        text: this.selectModel.getValue('msgText'),
      };
    }
    if (this.selectModel.getFormArrayValue('selectOptions').includes('error')) {
      this.selectModel
        .getControl('fakeSelect')
        .setValidators([Validators.required]);
      this.selectModel.getControl('fakeSelect').updateValueAndValidity();
      select.errors = {
        config: {
          startsInvalid: true,
        },
        messages: {
          required: 'Escolha Obrigatória',
        },
      };
    } else {
      this.selectModel.getControl('fakeSelect').clearValidators();
      this.selectModel.getControl('fakeSelect').updateValueAndValidity();
    }

    if (
      this.selectModel.getFormArrayValue('selectOptions').includes('borderless')
    ) {
      select.cssOption = ['border-top-0', 'border-bottom-0'];
    }

    if (select.css?.includes('search')) {
      select.search = {
        control: new FormControl(null, []),
        input: {
          name: 'search',
          cssInput: ['h-25px'],
          placeholder: 'Pesquisar...',
          type: EInputType.TEXT,
          icon: {
            icon: {
              library: 'bi',
              value: 'bi-search',
              css: ['fs-6', 'me-2'],
            },
            position: EPosition.RIGHT,
          },
        },
      };
    }
    this.select = select;
    this.srcCode =
      '\nISelect = ' + JSON.stringify(this.removeForm(select), null, 2);
  }

  removeForm(select: ISelect) {
    if (select.css?.includes('search')) {
      return {
        ...select,
        search: {
          input: { ...select.search?.input },
          control: 'new FormControl(null, [])',
        },
      };
    }
    return select;
  }

  onOptionsChanged(): void {
    this.startSelect();
  }

  onStyleChanged(): void {
    this.selectModel.getControl('fakeSelect').setValue(null);
    this.startSelect();
  }

  onChange(): void {
    this.startSelect();
  }
}
