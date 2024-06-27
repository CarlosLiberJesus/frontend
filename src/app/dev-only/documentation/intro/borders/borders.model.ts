import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';

export class BordersModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Imagine o Texto', []),
      border: new FormControl('none', []),
      color: new FormControl('gray-200', []),
      width: new FormControl(1, []),
      sides: new FormArray([new FormControl('all', [])], []),
      rounded: new FormControl(false, []),
      style: new FormControl('rounded', []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getFormArray(arrayName: string): FormArray {
    return this.formGroup.get(arrayName) as FormArray;
  }
  getValue(controlName: string): string | number {
    return this.getControl(controlName).value;
  }
  getFormArrayValue(arrayName: string): string[] {
    return this.getFormArray(arrayName).controls.map(control => control.value);
  }
  resetFormArray(): void {
    this.formGroup.setControl('sides', new FormArray([], []));
  }

  getInputText(): IInput {
    return {
      name: 'text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getBorderOptions(): ISelect {
    return {
      name: 'styles',
      cssOption: ['text-dark'],
      placeholder: 'Estilos',
      css: ['floating', 'mb-5'],
      option: [
        {
          text: 'Nenhum',
          value: 'none',
        },
        {
          text: 'Sólido',
          value: 'default',
        },
        {
          text: 'Tracejado',
          value: 'dashed',
        },
        {
          text: 'Pontilhado',
          value: 'dotted',
        },
      ],
    };
  }

  getArrayColors(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: 'Cores',
      css: ['floating', 'mb-5'],
      option: [
        {
          text: 'Padrão',
          value: 'gray-200',
          color: 'bg-gray-200',
        },
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
          text: 'Escuro',
          value: 'dark',
          color: 'bg-dark',
        },
      ],
    };
  }

  getWidthOptions(): IRangeSlider {
    return {
      name: 'width',
      placeholder: 'Tamanho',
      css: ['floating', 'mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }

  getMarginOptions(): ICheckBoxList {
    return {
      name: 'border-sides',
      css: ['form-check-inline', 'gap-2', 'mb-5', 'form-check-white'],
      checkbox: [
        {
          text: 'Todos',
          value: 'all',
        },
        {
          text: 'Esquerda',
          value: 'start',
        },
        {
          text: 'Topo',
          value: 'top',
        },
        {
          text: 'Direita',
          value: 'end',
        },
        {
          text: 'Fundo',
          value: 'bottom',
        },
      ],
    };
  }

  getRoundedToggle(): IToggle {
    return {
      name: 'rounded',
      css: [
        'gap-2',
        'form-check-primary',
        'no-border',
        'form-check-solid-white',
      ],
    };
  }

  getRoundedStyles(): ISelect {
    return {
      name: 'rounded-style',
      cssOption: ['text-dark'],
      placeholder: 'Arredondado',
      css: ['floating', 'mb-5'],
      option: [
        {
          text: 'Arredondado',
          value: 'rounded',
        },
        {
          text: 'Topo',
          value: 'top',
        },
        {
          text: 'Fundo',
          value: 'bottom',
        },
        {
          text: 'Início',
          value: 'start',
        },
        {
          text: 'Fim',
          value: 'end',
        },
        {
          text: 'Pílula',
          value: 'pill',
        },
        {
          text: 'Círculo',
          value: 'circle',
        },
      ],
    };
  }
}
