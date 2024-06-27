import { IIcon } from '../../base/icon/icon';
import { IBadge } from '../badge/badge';
import { ISpinner } from '../spinner/spinner';

export interface IButton {
  name?: string;
  text?: string;
  css?: string[];
  badge?: IBadge;
  iconFirst?: IIcon;
  iconLast?: IIcon;
  spinner?: ISpinner;
  autoReturn?: boolean;
  color?: {
    css: string[];
  };
}
