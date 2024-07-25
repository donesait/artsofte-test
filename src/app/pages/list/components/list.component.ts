import {Component} from '@angular/core';
import {CompanyFilterComponent, CompanyListComponent, CompanySortComponent} from "@feature-modules";
import {RouterLink} from "@angular/router";
import {CompanyFilterService, DestroyService, SortingCompaniesService} from "@core";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CompanyListComponent,
    RouterLink,
    CompanySortComponent,
    CompanyFilterComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './styles/list.component.scss',
  providers: [DestroyService, SortingCompaniesService, CompanyFilterService]
})
export class ListComponent {
  constructor(private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _destroy$: DestroyService) {
  }
}
