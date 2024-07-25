import {Component} from '@angular/core';
import {CompaniesMapListComponent, ModalComponent, YandexMapComponent} from "@feature-modules";
import {YandexMapService} from "../services/yandex-map.service";
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
  providers: [YandexMapService]
})
export class MapCompaniesComponent {

  protected _isOpen: boolean = true;

  constructor(protected readonly _yandexMapService: YandexMapService) {
  }

  protected closeModal(): void {
    this._isOpen = false;
  }
}
