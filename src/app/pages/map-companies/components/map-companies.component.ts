import { Component } from '@angular/core';
import {YandexMapComponent} from "../../../feature-modules/components/yandex-map/components/yandex-map.component";
import {
  CompaniesMapListComponent
} from "../../../feature-modules/components/companies-map-list/components/companies-map-list.component";
import {YandexMapService} from "../services/yandex-map.service";
import {ModalService} from "../services/modal.service";
import {ModalComponent} from "../../../feature-modules/components/modal/components/modal.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-map-companies',
  standalone: true,
  imports: [
    YandexMapComponent,
    CompaniesMapListComponent,
    ModalComponent,
    NgIf
  ],
  templateUrl: './map-companies.component.html',
  styleUrl: './styles/map-companies.component.scss',
  providers: [YandexMapService, ModalService]
})
export class MapCompaniesComponent {

  protected _isOpen: boolean = true;

  constructor(protected readonly _yandexMapService: YandexMapService) {
  }

  protected closeModal(): void {
    this._isOpen = false;
  }
}
