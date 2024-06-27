import { IIcon } from '../../base/icon/icon';
import { IButton } from '../../html/button/button';
import { ICheckBoxList } from '../check-box/check-box';
import { IInput } from '../input/input';
import { IRadioList } from '../radio/radio';
import { ISelect } from '../select/select';

export interface IAnyInput {
  text?: string;
  input?: IInput;
  select?: ISelect;
  radio?: IRadioList;
  checkbox?: ICheckBoxList;
  button?: IButton;
  css?: string[];
}
export interface IInputGroup {
  anyInput: IAnyInput[];
  autoReturn?: boolean;
  css?: string[];
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
