import { IIcon } from '../../base/icon/icon';
import { IErrorMessages } from '../../elements';

export interface IRadio {
  text: string;
  value: string;
  css?: string[];
  cssLabel?: string[];
}
export interface IRadioList {
  name: string;
  radio: IRadio[];
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
