import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.6)' }),
    animate('0.6s ease-in', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition('* => *', [
    query(':enter', [style({ opacity: 0, transform: 'scale(0.6)' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        animate(
          '0.4s',
          style({
            opacity: 0,
            transform: 'scale(0.9)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        //style({ opacity: 0, transform: 'scale(0.6)' }),
        animate('0.6s ease-in', style({ opacity: 1, transform: 'scale(1)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
]);
