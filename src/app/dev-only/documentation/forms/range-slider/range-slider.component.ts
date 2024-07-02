import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { RangeSliderModel } from './range-slider.model';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-forms-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationSliddlerComponent implements OnInit {
  rangeSlidder!: IRangeSlider;
  srcCode!: string;
  options!: ICheckBoxList;

  constructor(public rangeSliderModel: RangeSliderModel) {
    this.rangeSliderModel.startForms();
    this.getSlidder();
  }

  ngOnInit(): void {
    this.options = this.rangeSliderModel.getOptions();
    this.getSlidder();
  }

  getSlidder() {
    const slidder: IRangeSlider = {
      name: 'slidder',
      placeholder: this.rangeSliderModel.getValue('placeholderText'),
      css: [
        'form-check-ancap',
        this.rangeSliderModel
          .getFormArrayValue('optionsControl')
          .includes('disabled')
          ? 'disabled'
          : '',
      ],
      valuesList: [
        '0',
        '10',
        '20',
        '30',
        '40',
        '50',
        '60',
        '70',
        '80',
        '90',
        '100',
      ],
    };
    if (
      this.rangeSliderModel
        .getFormArrayValue('optionsControl')
        .includes('label')
    ) {
      slidder.label = {
        text: this.rangeSliderModel.getValue('labelText'),
      };
    }
    if (
      this.rangeSliderModel
        .getFormArrayValue('optionsControl')
        .includes('message')
    ) {
      slidder.message = {
        text: this.rangeSliderModel.getValue('msgText'),
      };
    }
    if (
      this.rangeSliderModel
        .getFormArrayValue('optionsControl')
        .includes('disabled')
    ) {
      this.rangeSliderModel.getControl('slider').disable();
    } else {
      this.rangeSliderModel.getControl('slider').enable();
    }
    this.srcCode = '\nIRangeSlider = ' + JSON.stringify(slidder, null, 2);
    this.rangeSlidder = slidder;
  }

  onChange(): void {
    this.getSlidder();
  }
}
