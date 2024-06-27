import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IMultiSelect } from 'src/modules/elements/forms/multi-select/multi-select';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { MultiSelectModel } from './multi-select.model';
import { EInputType } from 'src/modules/elements/forms/input/input';
import { EPosition } from 'src/modules/elements/elements';

@Component({
  selector: 'app-bootstrap-documentation-forms-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationMultiSelectComponent implements OnInit {
  multiSelect!: IMultiSelect;
  srcCode!: string;

  options!: ICheckBoxList;

  constructor(public multiSelectModel: MultiSelectModel) {
    this.multiSelectModel.startForms();
  }

  ngOnInit() {
    this.options = this.multiSelectModel.getSelectOptions();
    this.startMultiSelect();
  }

  startMultiSelect(): void {
    const multiSelect: IMultiSelect = {
      name: 'select',
      placeholder: 'Selecione uma opção',
      css: [
        'min-w-200px',
        ...this.multiSelectModel.getFormArrayValue('selectOptions'),
      ],
      option: this.multiSelectModel.getDefaultOptions(),
    };

    if (multiSelect.css?.includes('icon-check')) {
      multiSelect.iconChecked = {
        library: 'ki-duotone',
        value: 'ki-check',
        css: [
          'fs-2',
          ...(multiSelect.css?.includes('active') ? ['text-white'] : []),
        ],
      };
    }

    if (
      this.multiSelectModel.getFormArrayValue('selectOptions').includes('label')
    ) {
      multiSelect.label = {
        text: this.multiSelectModel.getValue('labelText'),
      };
    }
    if (
      this.multiSelectModel
        .getFormArrayValue('selectOptions')
        .includes('message')
    ) {
      multiSelect.message = {
        text: this.multiSelectModel.getValue('msgText'),
      };
    }
    if (
      this.multiSelectModel.getFormArrayValue('selectOptions').includes('error')
    ) {
      this.multiSelectModel
        .getControl('fakeMultiSelect')
        .setValidators([Validators.required]);
      this.multiSelectModel
        .getControl('fakeMultiSelect')
        .updateValueAndValidity();
      multiSelect.errors = {
        config: {
          startsInvalid: false,
        },
        messages: {
          required: 'Este campo é obrigatório.',
        },
      };
    } else {
      this.multiSelectModel.getControl('fakeMultiSelect').clearValidators();
      this.multiSelectModel
        .getControl('fakeMultiSelect')
        .updateValueAndValidity();
    }

    if (
      this.multiSelectModel
        .getFormArrayValue('selectOptions')
        .includes('borderless')
    ) {
      multiSelect.cssOption = ['border-top-0', 'border-bottom-0'];
    }

    if (multiSelect.css?.includes('search')) {
      multiSelect.search = {
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

    this.multiSelect = multiSelect;
    this.srcCode =
      '\nIMultiSelect = ' +
      JSON.stringify(this.removeForm(multiSelect), null, 2);
  }

  removeForm(multiSelect: IMultiSelect) {
    if (multiSelect.css?.includes('search')) {
      return {
        ...multiSelect,
        search: {
          input: { ...multiSelect.search?.input },
          control: 'new FormControl(null, [])',
        },
      };
    }
    return multiSelect;
  }

  onOptionsChanged(): void {
    this.startMultiSelect();
  }

  onChange(): void {
    this.startMultiSelect();
  }
}
