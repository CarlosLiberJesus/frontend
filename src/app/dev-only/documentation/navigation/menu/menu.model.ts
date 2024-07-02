import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class MenuModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      directionControl: new FormControl('menu-row', []),
      openControl: new FormControl('click', []),
      colorControl: new FormControl('primary', []),
      examples: new FormControl('', []),

      mainCss: new FormControl('', []),

      leveloneitem: new FormControl('', []),
      levelonelink: new FormControl('', []),
      levelonetitle: new FormControl('', []),

      leveltwo: new FormControl('menu-sub-dropdown w-100px', []),
      leveltwoitem: new FormControl('', []),
      leveltwolink: new FormControl('', []),
      leveltwotitle: new FormControl('', []),

      levelthree: new FormControl('', []),
      levelthreeitem: new FormControl('', []),
      levelthreelink: new FormControl('', []),
      levelthreetitle: new FormControl('', []),
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

  getDirectionOptions(): IRadioList {
    return {
      name: 'direction',
      css: [
        'gap-2',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Vertical',
          value: 'menu-column',
        },
        {
          text: 'Horizontal',
          value: 'menu-row',
        },
      ],
    };
  }

  getOpenOptions(): IRadioList {
    return {
      name: 'openStyle',
      css: [
        'gap-2',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Clique',
          value: 'click',
        },
        {
          text: 'Hover',
          value: 'hover',
        },
      ],
    };
  }

  getColorOptions(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: 'Escolha a Cor',
      css: ['icon-check', 'unselect', 'floating', 'min-w-150px'],
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
        {
          text: 'Primário',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundário',
          value: 'secondary',
          color: 'bg-secondary',
        },
        {
          text: 'Sucesso',
          value: 'success',
          color: 'bg-success',
        },
        {
          text: 'Informação',
          value: 'info',
          color: 'bg-info',
        },
        {
          text: 'Aviso',
          value: 'warning',
          color: 'bg-warning',
        },
        {
          text: 'Perigo',
          value: 'danger',
          color: 'bg-danger',
        },
        {
          text: 'Claro',
          value: 'light',
          color: 'bg-light',
        },
        {
          text: 'Escuro',
          value: 'dark',
          color: 'bg-dark',
        },
        {
          text: 'Ancap',
          value: 'ancap',
          color: 'bg-ancap',
        },
        {
          text: 'Capan',
          value: 'capan',
          color: 'bg-capan',
        },
      ],
    };
  }
}
