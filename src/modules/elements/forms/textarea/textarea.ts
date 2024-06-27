import { IIcon } from '../../base/icon/icon';
import { IErrorMessages } from '../../elements';

export interface ITextarea {
  name: string;
  placeholder?: string;
  autoReturn?: boolean;
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
  cssTextareaContainer?: string[];
  cssTextarea?: string[];
  errors?: IErrorMessages;
}
