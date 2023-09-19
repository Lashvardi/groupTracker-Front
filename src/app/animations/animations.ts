import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  state('void', style({ opacity: 0 })),
  transition('void <=> *', [
    animate(500),
  ]),
]);
