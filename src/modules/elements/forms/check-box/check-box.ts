import { IIcon } from '../../base/icon/icon';
import { IErrorMessages } from '../../elements';

export interface ICheckBox {
  text: string;
  value: string;
  css?: string[];
  cssLabel?: string[];
}
export interface ICheckBoxList {
  name: string;
  checkbox: ICheckBox[];
  autoReturn?: boolean;
  css?: string[];
  cssContainer?: string[];
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
  errors?: IErrorMessages;
}
