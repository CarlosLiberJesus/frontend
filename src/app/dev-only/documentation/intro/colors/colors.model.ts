import { FormGroup, FormControl } from '@angular/forms';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';

export class ColorsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Imagine o Texto', []),
      colors: new FormControl('dark', []),
      background: new FormControl('white', []),
      light: new FormControl(false, []),
      opacity: new FormControl(
        this.getOpacity().valuesList.findIndex(
          (elem: string) => elem === '100'
        ),
        []
      ),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string | number {
    return this.getControl(controlName).value;
  }

  getInputText(): IInput {
    return {
      name: 'colors-text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getArrayColors(): ISelect {
    return {
      name: 'colors',
      placeholder: '',
      cssOption: ['text-dark'],
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
        {
          text: 'Primária',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundária',
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
          text: 'Atenção',
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

  getArrayGrayColors(): ISelect {
    return {
      name: 'colors-gray',
      placeholder: '',
      option: [
        {
          text: 'gray-100',
          value: 'gray-100',
          color: 'bg-gray-100',
        },
        {
          text: 'gray-200',
          value: 'gray-200',
          color: 'bg-gray-200',
        },
        {
          text: 'gray-300',
          value: 'gray-300',
          color: 'bg-gray-300',
        },
        {
          text: 'gray-400',
          value: 'gray-400',
          color: 'bg-gray-400',
        },
        {
          text: 'gray-500',
          value: 'gray-500',
          color: 'bg-gray-500',
        },
        {
          text: 'gray-600',
          value: 'gray-600',
          color: 'bg-gray-600',
        },
        {
          text: 'gray-700',
          value: 'gray-700',
          color: 'bg-gray-700',
        },
        {
          text: 'gray-800',
          value: 'gray-800',
          color: 'bg-gray-800',
        },
        {
          text: 'gray-900',
          value: 'gray-900',
          color: 'bg-gray-900',
        },
      ],
    };
  }

  getLight(): IToggle {
    return {
      name: 'light',
      css: ['gap-2', 'form-check-ancap'],
      size: ['h-30px', 'w-50px'],
    };
  }

  getOpacity(): IRangeSlider {
    return {
      name: 'slidder',
      placeholder: 'Opacidade',
      css: ['mb-3'],
      valuesList: ['5', '10', '15', '20', '25', '50', '75', '100'],
    };
  }
}
