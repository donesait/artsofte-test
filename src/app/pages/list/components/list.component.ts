import { Component } from '@angular/core';
import {CompanyListComponent} from "../../../feature-modules";
import {RouterLink} from "@angular/router";
import {CompanySortComponent} from "../../../feature-modules/components/company-sort/components/company-sort.component";
import {SortingCompaniesService} from "../../../core/services/sorting-companies.service";
import {DestroyService} from "../../../core";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CompanyListComponent,
    RouterLink,
    CompanySortComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './styles/list.component.scss',
  providers: [DestroyService, SortingCompaniesService]
})
export class ListComponent {
  constructor(private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _destroy$: DestroyService) {
  }
}
