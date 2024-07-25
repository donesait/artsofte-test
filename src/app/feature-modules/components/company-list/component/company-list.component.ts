import {Component, SkipSelf} from '@angular/core';
import {CompanyService, ScrollDirection} from "../../../../core";
import {AsyncPipe, CommonModule, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CompanyItemComponent} from "../../company-item/components/company-item.component";
import {LoaderComponent} from "../../loader/components/loader.component";
import {HighlightHoverDirective, ObserveElementDirective} from "../../../directives";
import {Router} from "@angular/router";
import {CompanyScrollService} from "../services/company-scroll.service";
import {SortingCompaniesService} from "../../../../core/services/sorting-companies.service";
import {animate, stagger, style, transition, trigger} from "@angular/animations";
import {SkeletonLoaderComponent} from "../../sceleton-loader/components/skeleton-loader.component";
import {ARRAY_FOR_SKELETON} from "../data/constants/skeleton-count.constant";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {CompanyFilterService} from "../../../../core/services/company-filter.service";

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgForOf,
    CompanyItemComponent,
    NgIf,
    LoaderComponent,
    ObserveElementDirective,
    SkeletonLoaderComponent,
    HighlightHoverDirective,
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './style/company-list.component.scss',
  providers: [CompanyScrollService],

})
export class CompanyListComponent {

  protected readonly ARRAY_FOR_SKELETON: number[] = ARRAY_FOR_SKELETON;

  constructor(@SkipSelf() protected readonly _companyService: CompanyService, private readonly _companyFilterService: CompanyFilterService, private readonly _router: Router, private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _companyScrollService: CompanyScrollService) {

  }

  protected onScroll(direction: ScrollDirection): void {
    this._companyScrollService.addCompanies(direction);
  }

  protected navigateToDetailPage(companyId: number): void {
    this._router.navigate(['detail', companyId], {queryParams: {'back-url': 'list'}})
  }
}
