import { FormControl, FormGroup } from '@angular/forms';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

export class SeparatorModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Pode ser qualquer texto', []),
      padding: new FormControl(
        this.getPaddingOptions().valuesList.findIndex(
          (elem: string) => elem === '0'
        ),
        []
      ),
      size: new FormControl(
        this.getSizeOptions().valuesList.findIndex(
          (elem: string) => elem === '0'
        ),
        []
      ),
      color: new FormControl('gray-200', []),
      style: new FormControl('separator-solid', []),
      toggle: new FormControl(false, []),
      type: new FormControl('text', []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }

  getTextOptions(): IInput {
    return {
      name: 'text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getPaddingOptions(): IRangeSlider {
    return {
      name: 'padding',
      placeholder: 'Distância Entre Linhas',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    };
  }
  getSizeOptions(): IRangeSlider {
    return {
      name: 'size',
      placeholder: 'Tamanho da Linha',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }

  getColorOptions(): ISelect {
    return {
      name: 'color-option',
      cssOption: ['text-dark'],
      placeholder: 'Cor da Linha',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Cinza-200',
          value: 'gray-200',
          color: 'bg-gray-200',
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
      ],
    };
  }

  getStylesOptions(): ISelect {
    return {
      name: 'style-option',
      cssOption: ['text-dark'],
      placeholder: 'Estilo da Linha',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Sólido',
          value: 'separator-solid',
        },
        {
          text: 'Tracejado',
          value: 'separator-dotted',
        },
        {
          text: 'Pontilhado',
          value: 'separator-dashed',
        },
      ],
    };
  }

  getToggleOptions(): IToggle {
    return {
      name: 'toggle-content',
      text: 'Adicionar Conteúdo',
      css: [
        'gap-2',
        'form-check-primary',
        'no-border',
        'form-check-solid-white',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getTypeOptions(): IRadioList {
    return {
      name: 'type',
      css: ['mb-2', 'gap-2', 'form-check-white', 'form-check-inline'],
      radio: [
        {
          text: 'Texto',
          value: 'text',
        },
        {
          text: 'Icon',
          value: 'icon',
        },
      ],
    };
  }
}
