import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class TabsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      tabOne: new FormControl('Conteúdo na aba exibida', []),
      tabTwo: new FormControl('Alternar seu conteúdo na aba exibida', []),
      tabThree: new FormControl('Apenas preencha ng-template', []),
      direction: new FormControl('', []),
      tabsOptions: new FormArray([], []),
    });
  }
  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getFormArray(arrayName: string): FormArray {
    return this.formGroup.get(arrayName) as FormArray;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }
  getFormArrayValue(arrayName: string): string[] {
    return this.getFormArray(arrayName).controls.map(control => control.value);
  }

  getInputText(name: string, placeholder: string): IInput {
    return {
      name: 'text' + name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getTabsOptions(): ICheckBoxList {
    return {
      name: 'tabs-options',
      css: [
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
        'gap-2',
        'mb-3',
      ],
      checkbox: [
        {
          text: 'Disable',
          value: 'disabled',
        },
        {
          text: 'Pills',
          value: 'nav-pills',
        },
        {
          text: 'Fill',
          value: 'nav-fill',
        },
        {
          text: 'Justified',
          value: 'nav-justified',
        },
        {
          text: 'Style1',
          value: 'nav-line-tabs',
        },
        {
          text: 'No-border',
          value: 'border-transparent',
        },
      ],
    };
  }

  getDirectionOptions(): IRadioList {
    return {
      name: 'horizontal',
      css: [
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
        'gap-2',
        'mb-3',
      ],
      radio: [
        {
          text: 'Vertical',
          value: 'flex-column',
        },
        {
          text: 'Horizontal',
          value: '',
        },
      ],
    };
  }
}
