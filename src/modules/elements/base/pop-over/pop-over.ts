import { EEvent, EPosition } from '../../elements';

export interface IPopOver {
  title?: string;
  content: string;
  event?: EEvent;
  position: EPosition;
  cssContainer?: string[];
  cssTitle?: string[];
  cssContent?: string[];
}
