import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../../button/components/button.component";
import {DATA_KEY, LocalStorageService, SELECT_STORE_KEY} from "../../../../core";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './styles/modal.component.scss'
})
export class ModalComponent {
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>()

  constructor(private readonly _storageService: LocalStorageService) {
  }

  protected selectApplicationStore(): void {
    this._storageService.saveData(SELECT_STORE_KEY, 'application');
    this._storageService.removeData(DATA_KEY);
    this.onClose.emit();
  }

  protected selectLocalStorage(): void {
    this._storageService.saveData(SELECT_STORE_KEY, 'localstorage');
    this.onClose.emit();
  }

  protected stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
