import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class CheckBoxModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeCheckBox: new FormArray([], []),
      directionControl: new FormControl('', []),
      colorControl: new FormControl('primary', []),
      hardSizeControl: new FormControl('form-check-default', []),
      optionsControl: new FormArray([], []),
      marginControl: new FormControl(0, []),
      paddingControl: new FormControl(0, []),
      sizeControl: new FormControl(
        this.getDynamicSizeOptions().valuesList.findIndex(
          (elem: string) => elem === 'h-30px w-30px'
        ),
        []
      ),
      labelText: new FormControl('Adicionar Título', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
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
      name: name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getDirectionOptions(): IRadioList {
    return {
      name: 'direction',
      css: ['mb-2', 'gap-2', 'form-check-white', 'form-check-ancap'],
      radio: [
        {
          text: 'Vertical',
          value: '',
        },
        {
          text: 'Horizontal',
          value: 'form-check-inline',
        },
      ],
    };
  }
  getColorOptions(): ISelect {
    return {
      name: 'radio-color',
      cssOption: ['text-dark'],
      placeholder: 'Escolha uma Cor',
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
  getHardSizeOptions(): ISelect {
    return {
      name: 'radio-sizes',
      cssOption: ['text-dark'],
      placeholder: 'Tamanho do Rádio',
      css: ['mt-3'],
      option: [
        {
          text: 'Normal',
          value: 'form-check-default',
        },
        {
          text: 'Pequeno',
          value: 'form-check-sm',
        },
        {
          text: 'Grande',
          value: 'form-check-lg',
        },
      ],
    };
  }
  getOptions(): ICheckBoxList {
    return {
      name: 'options',
      css: [
        'mb-3',
        'me-5',
        'form-check-inline',
        'form-check-white',
        'form-check-ancap',
        'gap-3',
      ],
      cssContainer: [
        'd-flex',
        'align-items-center',
        'justify-content-start',
        'flex-wrap',
      ],
      checkbox: [
        {
          text: 'Mostrar Etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar Mensagem',
          value: 'message',
        },
        {
          text: 'Activar Erros',
          value: 'error',
        },
        {
          text: 'Desativado',
          value: 'disabled',
        },
        {
          text: 'Sólido',
          value: 'form-check-solid',
        },
        {
          text: 'Sem Margens',
          value: 'no-border',
        },
        {
          text: 'Dinâmico',
          value: 'dynamic',
        },
        {
          text: 'Forte',
          value: 'form-label',
        },
      ],
    };
  }
  getMarginOptions(): IRangeSlider {
    return {
      name: 'margins',
      placeholder: 'Margens',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }

  getPaddingOptions(): IRangeSlider {
    return {
      name: 'padding',
      placeholder: 'Distância',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }
  getDynamicSizeOptions(): IRangeSlider {
    return {
      name: 'size',
      placeholder: 'Tamanho do Rádio',
      css: ['mb-5'],
      valuesList: ['h-30px w-30px', 'h-40px w-40px', 'h-50px w-50px'],
    };
  }
}
