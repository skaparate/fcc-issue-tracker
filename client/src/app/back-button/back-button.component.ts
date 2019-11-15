import { Component, Input } from '@angular/core';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'back-button',
  template: `
    <button class="{{ classes }}" backButton>
      <fa-icon [icon]="icon"></fa-icon>
      {{ label }}
    </button>
  `,
})
export class BackButtonComponent {
  @Input() label = '';
  @Input() classes = '';
  @Input() icon = null;

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
