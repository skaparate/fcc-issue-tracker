import { Component, Input } from '@angular/core';

@Component({
  selector: 'nmv-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() isClosable: boolean = true;
}
