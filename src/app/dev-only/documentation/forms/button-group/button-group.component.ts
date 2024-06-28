import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IButtonGroup } from 'src/modules/elements/forms/button-group/button-group';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IIcon } from 'src/modules/elements/base/icon/icon';
import { EEvent, EPosition } from 'src/modules/elements/elements';
import { EInputType } from 'src/modules/elements/forms/input/input';
import { ButtonGroupModel } from './button-group.model';

@Component({
  selector: 'app-bootstrap-documentation-forms-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationButtonGroupComponent implements OnInit {
  buttonGroup!: IButtonGroup;
  srcCode!: string;

  options!: ICheckBoxList;

  icon: IIcon = {
    library: 'fa-regular',
    value: 'fa-gem',
    css: ['fs-6', 'ms-2'],
    popOver: {
      content: 'Mensagem importante',
      event: EEvent.HOVER,
      position: EPosition.TOP,
      cssContainer: ['fade show'],
    },
  };

  constructor(public buttonGroupModel: ButtonGroupModel) {
    this.buttonGroupModel.startForms();
  }

  ngOnInit(): void {
    this.startButtonGroup();
  }

  startButtonGroup(): void {
    this.options = this.buttonGroupModel.getOptions();
    const buttonGroup: IButtonGroup = {
      name: 'fakeButtonGroup',
      type: this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('multiple')
        ? EInputType.CHECKBOX
        : EInputType.RADIO,
      cssContainer: [],
      active: {
        color: 'primary',
        css: ['text-white', 'fw-bold'],
      },
      element: this.buttonGroupModel.getDefaultButtons(),
    };

    if (
      this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('label')
    ) {
      buttonGroup.label = {
        text: this.buttonGroupModel.getValue('labelText'),
        css: ['fs-5', 'fw-semibold'],
        extra: this.buttonGroupModel.getValue('extraText'),
        cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
      };
      if (
        this.buttonGroupModel
          .getFormArrayValue('optionsControl')
          .includes('icon')
      ) {
        buttonGroup.label.icon = this.icon;
      }
    }
    if (
      this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('message')
    ) {
      buttonGroup.message = {
        text: this.buttonGroupModel.getValue('msgText'),
      };
    }

    if (
      this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('errors')
    ) {
      this.buttonGroupModel
        .getControl('fakeButtonGroup')
        .setValidators([Validators.required]);
      this.buttonGroupModel
        .getControl('fakeButtonGroup')
        .updateValueAndValidity();
      buttonGroup.errors = {
        config: {
          startsInvalid: true,
        },
        messages: {
          required: 'Este campo é obrigatório.',
        },
      };
    } else {
      this.buttonGroupModel.getControl('fakeButtonGroup').clearValidators();
      this.buttonGroupModel
        .getControl('fakeButtonGroup')
        .updateValueAndValidity();
    }

    if (
      this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('unselect')
    ) {
      buttonGroup.cssContainer?.push('unselect');
    }
    if (
      this.buttonGroupModel
        .getFormArrayValue('optionsControl')
        .includes('perrow')
    ) {
      buttonGroup.perRow = 2;
    }

    this.buttonGroup = buttonGroup;
    this.srcCode =
      '\nIButtonGroup = ' + JSON.stringify(this.buttonGroup, null, 2);
  }

  onChange(): void {
    this.startButtonGroup();
  }

  onButtonGroupChange(): void {
    // console.log(this.buttonGroupModel.getFormArrayValue('fakeButtonGroup'));
  }
}
