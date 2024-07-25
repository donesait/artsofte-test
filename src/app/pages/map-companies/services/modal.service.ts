import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  constructor() { }
}
