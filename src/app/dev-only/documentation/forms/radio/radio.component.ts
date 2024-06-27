import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IRadio, IRadioList } from 'src/modules/elements/forms/radio/radio';
import { RadioModel } from './radio.model';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-forms-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationRadioComponent implements OnInit {
  radioList!: IRadioList;
  srcCode!: string;
  isDynamicSize = false;

  directions!: IRadioList;
  options!: ICheckBoxList;

  constructor(public radioModel: RadioModel) {
    this.radioModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.radioModel.getOptions();
    this.directions = this.radioModel.getDirectionOptions();
    this.startRadio();
  }

  startRadio(): void {
    const margins = this.calculateMargins();
    const padding = this.calculatePadding();

    this.radioList = {
      name: 'radio',
      css: [
        ...margins,
        padding,
        this.radioModel.getValue('directionControl') ?? '',
        this.getRadioColorCss(),
      ].filter(Boolean),
      radio: this.generateRadioOptions(),
    };
    if (this.radioModel.getFormArrayValue('optionsControl').includes('label')) {
      this.radioList.label = {
        text: this.radioModel.getValue('labelText'),
      };
    }
    if (
      this.radioModel.getFormArrayValue('optionsControl').includes('message')
    ) {
      this.radioList.message = {
        text: this.radioModel.getValue('msgText'),
      };
    }
    if (this.radioModel.getFormArrayValue('optionsControl').includes('error')) {
      this.radioModel
        .getControl('fakeRadio')
        .setValidators([Validators.required]);
      this.radioModel.getControl('fakeRadio').updateValueAndValidity();
      this.radioList.errors = {
        config: {
          startsInvalid: true,
        },
        messages: {
          required: 'Campo Obrigatório',
        },
      };
    } else {
      this.radioModel.getControl('fakeRadio').clearValidators();
      this.radioModel.getControl('fakeRadio').updateValueAndValidity();
    }

    this.applyDynamicOptions();

    if (!this.isDynamicSize) {
      if (
        this.radioModel.getValue('hardSizeControl') !== 'form-check-default'
      ) {
        this.radioList.css?.push(
          this.radioModel.getValue('hardSizeControl') ?? ''
        );
      }
    }

    this.srcCode = '\nIRadioList = ' + JSON.stringify(this.radioList, null, 2);
  }

  calculateMargins(): string[] {
    const margins: string[] = [];
    if (this.radioModel.getValue('marginControl')) {
      const directionControl = this.radioModel.getValue('directionControl');
      margins.push(
        (directionControl === '' ? 'mb-' : 'me-') +
          this.radioModel.getValue('marginControl')
      );
    }
    return margins;
  }

  calculatePadding(): string {
    return this.radioModel.getValue('paddingControl')
      ? 'gap-' + this.radioModel.getValue('paddingControl')
      : '';
  }

  getRadioColorCss(): string {
    return this.radioModel.getValue('colorControl')
      ? 'form-check-' + this.radioModel.getValue('colorControl')
      : '';
  }

  generateRadioOptions(): IRadio[] {
    return [
      { text: 'Option 1', value: 'value1' },
      { text: 'Option 2', value: 'value2' },
      { text: 'Option 3', value: 'value3' },
    ];
  }

  applyDynamicOptions(): void {
    if (this.radioModel.getFormArrayValue('optionsControl')) {
      this.isDynamicSize = false;
      this.radioModel
        .getFormArrayValue('optionsControl')
        .forEach((option: string) => {
          switch (option) {
            case 'disabled': {
              this.applyCssToAllRadios('disabled');
              break;
            }
            case 'form-check-solid': {
              this.radioList.css?.push('form-check-solid');
              break;
            }
            case 'form-check-white': {
              this.radioList.css?.push('form-check-white');
              break;
            }
            case 'form-label': {
              this.radioList.css?.push('form-label');
              break;
            }
            case 'no-border': {
              this.applyCssToAllRadios('no-border');
              break;
            }
            case 'dynamic': {
              this.isDynamicSize = true;
              const pos: number =
                (this.radioModel.getValue(
                  'sizeControl'
                ) as unknown as number) ?? '0';
              const size: string =
                this.radioModel.getDynamicSizeOptions().valuesList[pos];
              this.applyCssToAllRadios(size);
              break;
            }
            default: {
              break;
            }
          }
        });
    }
  }

  applyCssToAllRadios(css: string): void {
    this.radioList.radio.map((radio: IRadio) => {
      radio.css ? radio.css.push(css) : (radio.css = [css]);
    });
  }

  onChange(): void {
    this.startRadio();
  }
}
