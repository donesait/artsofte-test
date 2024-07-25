import { Component } from '@angular/core';
import {CompanyService} from "../../../../core";
import {NgForOf} from "@angular/common";
import {ICompanyBase} from "../../../../core/models";
import {YandexMapService} from "../../../../pages/map-companies/services/yandex-map.service";
import {HighlightHoverDirective} from "../../../directives";

@Component({
  selector: 'app-companies-map-list',
  standalone: true,
  imports: [
    NgForOf,
    HighlightHoverDirective
  ],
  templateUrl: './companies-map-list.component.html',
  styleUrl: './styles/companies-map-list.component.scss'
})
export class CompaniesMapListComponent {
  constructor(protected readonly _companyService: CompanyService, private readonly _yandexMapService: YandexMapService) {
  }

  protected updateCoordinates(company: ICompanyBase): void {
    this._yandexMapService.updateCoordinates({latitude: company.latitude, longitude: company.longitude});
  }
}
