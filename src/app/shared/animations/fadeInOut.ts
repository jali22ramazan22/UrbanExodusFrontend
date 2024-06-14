import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export const fadeInOut =  trigger('openWindow', [
  state('in', style({
    opacity: 1,
  })),
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('0.2s ease')
  ]),
  transition('* => void', [
    animate(300,  style({
      opacity: 0,
    })),
  ])
])
