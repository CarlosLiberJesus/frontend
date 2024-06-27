import { IIcon } from '../../base/icon/icon';
import { IErrorMessages } from '../../elements';
import { IButton } from '../../html/button/button';
import { EInputType } from '../input/input';

export interface IButtonGroupElement {
  button: IButton;
  value: string;
}

export interface IButtonGroup {
  name: string;
  type: EInputType;
  element: IButtonGroupElement[];
  errors?: IErrorMessages;
  cssContainer?: string[];
  autoReturn?: boolean;
  perRow?: number;
  active: {
    color: string;
    css: string[];
  };
  label?: {
    text: string;
    css?: string[];
    extra?: string;
    cssExtra?: string[];
    icon?: IIcon;
  };
  message?: {
    text: string;
    css?: string[];
  };
}
