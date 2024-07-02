import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';

export class ButtonModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('botão', []),
      border: new FormControl('none', []),
      effects: new FormControl(null, []),
      colorBackground: new FormControl(null, []),
      colorLight: new FormControl(false, []),
      activateHover: new FormControl(false, []),
      colorText: new FormControl(null, []),
      hoverEffects: new FormControl(null, []),
      extras: new FormArray([], []),
      badge: new FormControl('inside', []),
      // TODO ? size: new FormControl(this.getSizeOptions().valuesList.findIndex((elem: string) => elem === 'none'), []),
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

  getTextOptions(): IInput {
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
      name: 'border-button',
      cssOption: ['text-dark'],
      placeholder: 'Estilo da Margem',
      option: [
        {
          text: 'Nenhuma',
          value: 'none',
        },
        {
          text: 'Tracejado',
          value: 'dashed',
        },
        {
          text: 'Sólido',
          value: 'solid',
        },
      ],
    };
  }

  getEffectsOption(): IRadioList {
    return {
      name: 'button-effects',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      radio: [
        {
          text: 'Elevar',
          value: 'hover-elevate-up',
        },
        {
          text: 'Baixar',
          value: 'hover-elevate-down',
        },
        {
          text: 'Escala',
          value: 'hover-scale',
        },
        {
          text: 'Rotacionar Fim',
          value: 'hover-rotate-end',
        },
        {
          text: 'Rotacionar Início',
          value: 'hover-rotate-start',
        },
      ],
    };
  }

  getColorsOptions(placeholder: string): ISelect {
    return {
      name: 'spinner-colors',
      placeholder: placeholder,
      css: ['floating'],
      cssOption: ['text-dark'],
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
          text: 'Alerta',
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

  getHoverOptions(): IToggle {
    return {
      name: 'toggleHover',
      text: 'Hover Ativo',
      css: [
        'gap-2',
        'form-check-ancap',
        'no-border',
        'form-check-solid-white',
        this.getValue('colorBackground') ? '' : 'disabled',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getColorLightOptions(): IToggle {
    return {
      name: 'toggleColors',
      text: 'Cores Claras?',
      css: [
        'gap-2',
        'form-check-ancap',
        'no-border',
        'form-check-solid-white',
        'mb-2',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getHoverEffectsOption(): IRadioList {
    return {
      name: 'button-hover-effects',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      radio: [
        {
          text: 'Texto',
          value: 'text',
        },
        {
          text: 'Fundo',
          value: 'background',
        },
      ],
    };
  }

  getExtrasOptions(): ICheckBoxList {
    const options = {
      name: 'extra-options',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      checkbox: [
        {
          text: 'Ícone Início',
          value: 'start',
        },
        {
          text: 'Ícone Fim',
          value: 'end',
        },
        {
          text: 'Adicionar Distintivo',
          value: 'badge',
        },
        {
          text: 'Giratório',
          value: 'spinner',
        },
        {
          text: 'Mensagem PopOver',
          value: 'popover',
        },
      ],
    };
    if (this.getValue('activateHover')) {
      options.checkbox.push({
        text: 'Activo',
        value: 'active',
      });
    }
    if (this.getFormArrayValue('extras').includes('start')) {
      options.checkbox.push({
        text: 'Rotacionar Ícon ao Clicar',
        value: 'rotate',
      });
    }
    return options;
  }

  getBadgeOptions(): ISelect {
    return {
      name: 'badge-position',
      cssOption: ['text-dark'],
      placeholder: 'Posição do Distintivo',
      css: ['floating'],
      option: [
        {
          text: 'Dentro',
          value: 'inside',
        },
        {
          text: 'Topo Esquerda',
          value: 'topLeft',
        },
        {
          text: 'Topo Direita',
          value: 'topRight',
        },
        {
          text: 'Fundo Esquerda',
          value: 'bottomLeft',
        },
        {
          text: 'Fundo Direita',
          value: 'bottomRight',
        },
      ],
    };
  }
}
