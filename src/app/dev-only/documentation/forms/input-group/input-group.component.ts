import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EInputType } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IInputGroup } from 'src/modules/elements/forms/input-group/input-group';
import { InputGroupModel } from './input-group.model';

@Component({
  selector: 'app-bootstrap-documentation-forms-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationInputGroupComponent implements OnInit {
  inputGroup!: IInputGroup;
  srcCode!: string;
  options!: ICheckBoxList;

  InputGroupFormControl: FormGroup = new FormGroup({
    input: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(5),
    ]),
  });

  constructor(public inputGroupModel: InputGroupModel) {
    this.inputGroupModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.inputGroupModel.getOptions();
    this.startInputGroup();
  }

  startInputGroup(): void {
    this.inputGroup = {
      anyInput: [
        {
          text: this.inputGroupModel.getValue('inputGroupText'),
        },
        {
          input: {
            name: 'input',
            cssInput: ['rounded-0 rounded-end'],
            type: EInputType.TEXT,
            placeholder: 'Etiqueta',
          },
        },
      ],
    };

    if (
      this.inputGroupModel.getFormArrayValue('optionsControl').includes('label')
    ) {
      this.inputGroup.label = {
        text: this.inputGroupModel.getValue('labelText'),
      };
    }
    if (
      this.inputGroupModel
        .getFormArrayValue('optionsControl')
        .includes('message')
    ) {
      this.inputGroup.message = {
        text: this.inputGroupModel.getValue('msgText'),
      };
    }

    this.srcCode =
      '\nIMultiSelect = ' + JSON.stringify(this.inputGroup, null, 2);
  }

  onChange(): void {
    this.startInputGroup();
  }

  onInputGroupChanged(): void {
    // console.log(_value, this.InputGroupFormControl.get(_value)?.value);
  }
}
