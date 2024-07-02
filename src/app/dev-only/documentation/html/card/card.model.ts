import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';

export class CardModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      header: new FormControl('Cabeçalho', []),
      body: new FormControl(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit laoreet id donec ultrices tincidunt arcu non sodales. Ultricies lacus sed turpis tincidunt id aliquet. Integer quis auctor elit sed vulputate mi sit. Urna duis convallis convallis tellus id interdum velit laoreet. In arcu cursus euismod quis viverra nibh. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Orci eu lobortis elementum nibh tellus molestie. Amet venenatis urna cursus eget. Sodales ut eu sem integer. At tellus at urna condimentum mattis. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Lacus luctus accumsan tortor posuere ac ut consequat. Praesent tristique magna sit amet purus gravida quis. Felis eget nunc lobortis mattis aliquam faucibus purus. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Imperdiet nulla malesuada pellentesque elit eget. Amet aliquam id diam maecenas ultricies mi eget mauris. Ac odio tempor orci dapibus ultrices. Ornare lectus sit amet est placerat in. Viverra maecenas accumsan lacus vel. Molestie nunc non blandit massa enim. Feugiat in fermentum posuere urna nec. Eget mauris pharetra et ultrices neque ornare aenean euismod. Vulputate enim nulla aliquet porttitor lacus luctus. Est ante in nibh mauris cursus. Risus sed vulputate odio ut enim.',
        []
      ),
      footer: new FormControl('Rodapé', []),
      options: new FormArray(
        [new FormControl('header'), new FormControl('footer')],
        []
      ),
      border: new FormControl('card-bordered', []),
      shadow: new FormControl('sm', []),
      ribbonPosition: new FormControl('end', []),
      color: new FormControl('primary', []),
      ribbonToggle: new FormControl(false, []),
      ribbonOptions: new FormArray([], []),
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

  getCardOptions(): ICheckBoxList {
    const options = {
      name: 'card-options',
      css: [
        'form-check-inline',
        'form-check-white',
        'gap-2',
        'mb-3',
        'form-check-ancap',
      ],
      checkbox: [
        {
          text: 'Tem Cabeçalho?',
          value: 'header',
        },
        {
          text: 'Tem Rodapé?',
          value: 'footer',
        },

        {
          text: 'Sombra Projetada?',
          value: 'shadow',
        },
        {
          text: 'Redefinir Preenchimentos',
          value: 'padding',
        },
        {
          text: 'Barra de Rolagem',
          value: 'scroollbar',
        },
        {
          text: 'Direção da Fita',
          value: 'ribbon',
        },
      ],
    };
    if (this.getFormArrayValue('options').includes('header')) {
      options.checkbox.push({
        text: 'Adicionar Acções?',
        value: 'action',
      });
    }
    if (this.getFormArrayValue('options').includes('action')) {
      options.checkbox.push(
        {
          text: 'Colapso',
          value: 'collapse',
        },
        {
          text: 'Removível',
          value: 'removable',
        }
      );
    }

    return options;
  }

  getBorderOptions(): IRadioList {
    return {
      name: 'borders-option',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      radio: [
        {
          text: 'Sem Margens',
          value: 'card-flush',
        },
        {
          text: 'Com Margens',
          value: 'card-bordered',
        },
        {
          text: 'Tracejado',
          value: 'card-dashed',
        },
      ],
    };
  }

  getShadowOptions(): IRadioList {
    return {
      name: 'shadow-option',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      radio: [
        {
          text: 'Pequena',
          value: 'sm',
        },
        {
          text: 'Grande',
          value: 'lg',
        },
      ],
    };
  }

  getRibbonToggleOptions(): IToggle {
    return {
      name: 'ribbon-toggle-option',
      text: 'Alternar para Ícon',
      antiText: 'Alternar para Texto',
      css: [
        'gap-2',
        'form-check-ancap',
        'no-border',
        'form-check-solid-white',
        'mb-3',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getRibbonPositionOptions(): IRadioList {
    return {
      name: 'ribbon-position-option',
      css: [
        'form-check-inline',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      radio: [
        {
          text: 'Topo',
          value: 'top',
        },
        {
          text: 'Fundo',
          value: 'bottom',
        },
        {
          text: 'Fim',
          value: 'end',
        },
        {
          text: 'Início',
          value: 'start',
        },
      ],
    };
  }

  getColorsOptions(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: 'Escolher Cor',
      css: ['floating'],
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
      ],
    };
  }

  getRibbonOptions(): ICheckBoxList {
    const options: ICheckBoxList = {
      name: 'ribbon-options',
      css: [
        'form-check-inline',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      checkbox: [
        {
          text: 'Vertical',
          value: 'vertical',
        },
        {
          text: 'Recorte',
          value: 'clip',
        },
      ],
    };
    return options;
  }
}
