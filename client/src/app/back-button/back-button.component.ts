import { Component, Input } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'back-button',
  template: `
    <a [routerLink]="linkTo" *ngIf="linkTo" class="{{ classes }}">
      <fa-icon [icon]="icon"></fa-icon>
      {{ label }}
    </a>
    <button class="{{ classes }}" backButton *ngIf="linkTo === null">
      <fa-icon [icon]="icon"></fa-icon>
      {{ label }}
    </button>
  `,
})
export class BackButtonComponent {
  @Input() label = '';
  @Input() classes = '';
  @Input() icon = null;
  @Input() linkTo: Array<any> = null;

  constructor() {
    if (!this.classes) {
      this.classes = 'button is-dark';
    }
    if (!this.label) {
      this.label = 'Back';
    }

    if (!this.icon) {
      this.icon = faLongArrowAltLeft;
    }
  }
}
