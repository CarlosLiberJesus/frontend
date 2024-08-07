export enum EPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  INSIDE = 'inside',
  TOPLEFT = 'topLeft',
  TOPRIGHT = 'topRight',
  BOTTOMLEFT = 'bottomLeft',
  BOTTOMRIGHT = 'bottomRight',
}

export enum EEvent {
  CLICK = 'click',
  HOVER = 'hover',
}

export interface IErrorMessages {
  config?: {
    startsInvalid?: boolean;
    showValid?: boolean;
  };
  messages?: {
    required?: string;
    minlength?: string;
    maxlength?: string;
    uppercase?: string;
    lowercase?: string;
    number?: string;
    specialCharacter?: string;
    email?: string;
    passwordMismatch?: string;
    pattern?: string;
    custom?: string;
  };
}
