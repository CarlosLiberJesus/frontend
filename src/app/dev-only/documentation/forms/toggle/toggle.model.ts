import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class ToggleModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeToggle: new FormControl(false, []),
      color: new FormControl('primary', []),
      options: new FormArray([], []),
      size: new FormControl(
        this.getSizeOptions().valuesList.findIndex(
          (elem: string) => elem === 'none'
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

  /**
   * Returns html input element configs
   *
   * @param name name of the html input -> consistent with Interfaces and future BO
   * @param placeholder
   * @returns {IInput}
   */
  getInputText(name: string, placeholder: string): IInput {
    return {
      name: name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['form-floating'],
    };
  }

  /**
   * Possible Colors
   *
   * @returns {ISelect}
   */
  getColorsOptions(): ISelect {
    return {
      name: 'colors',
      css: ['floating', 'unselect'],
      cssOption: ['text-dark'],
      placeholder: 'Cores',
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
        {
          text: 'Primário',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundário',
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

  /**
   * Possible Options
   *
   * @returns {ICheckBoxList}
   */
  getOptions(): ICheckBoxList {
    return {
      name: 'options',
      css: ['mb-3', 'me-5', 'gap-2', 'form-check-inline', 'form-check-white'],
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
          text: 'Ativar Erros',
          value: 'error',
        },
        {
          text: 'Personalizado',
          value: 'form-check-custom',
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
          text: 'Sem Margem',
          value: 'no-border',
        },
        {
          text: 'Tamanho Dinâmico',
          value: 'dynamic',
        },
      ],
    };
  }

  /**
   * Possible Sizes
   *
   * @returns {IRangeSlider}
   */
  getSizeOptions(): IRangeSlider {
    return {
      name: 'size',
      placeholder: 'Tamanho',
      valuesList: [
        'none',
        'h-20px w-30px',
        'h-25px w-40px',
        'h-30px w-50px',
        'h-40px w-60px',
      ],
    };
  }
}
