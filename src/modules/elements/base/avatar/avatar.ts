import { IBadge } from '../../html/badge/badge';

export interface IAvatar {
  img?: string;
  imgAlt?: string;
  base64?: string;
  label?: string;
  badge?: IBadge;
  css?: string[];
  labelCss?: string[];
}
