import {Injectable} from '@angular/core';
import {CompanyFilterService, CompanyService, ScrollDirection, SortingCompaniesService} from "@core";
import {enviroment} from "../../../../../enviroments/enviroment";
import {PRELOAD_ITEM_SIZE} from "../data/constants/preload-items-size.constant";
import {ICompanyBase} from "../../../../core/models";

@Injectable()
export class CompanyScrollService {

  constructor(private readonly _companyService: CompanyService, private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _companyFilterService: CompanyFilterService) {
  }

  public addCompanies(scrollDirection: ScrollDirection): void {
    const actualPostArray: ICompanyBase[] = this.getActualArray(scrollDirection);
    if (scrollDirection === ScrollDirection.Up) {
      this._companyService.indexCompanies = this._companyService.indexCompanies - PRELOAD_ITEM_SIZE;
      window.scrollTo({top: document.body.scrollHeight / 2 - ((window.innerWidth - document.body.scrollWidth) / 2)});
    } else {
      this._companyService.indexCompanies = this._companyService.indexCompanies + PRELOAD_ITEM_SIZE;
      this.checkAvailableCompaniesForDownScroll();
    }

    this._companyService.companies = actualPostArray;
  }

  public getActualArray(scrollDirection: ScrollDirection): ICompanyBase[] {
    const companiesArray: ICompanyBase[] = scrollDirection === ScrollDirection.Up
      ? [...this._sortingCompaniesService.startSorting(this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies - PRELOAD_ITEM_SIZE * 2, this._companyService.indexCompanies - PRELOAD_ITEM_SIZE)), ...this._companyService.companiesSnapshot.slice(0, enviroment.showItemsCount - PRELOAD_ITEM_SIZE)]
      : [...this._companyService.companiesSnapshot.slice(-(enviroment.showItemsCount - PRELOAD_ITEM_SIZE)), ...this._sortingCompaniesService.startSorting(this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies, this._companyService.indexCompanies + PRELOAD_ITEM_SIZE))]

    return this._companyFilterService.filterCompanies(companiesArray);
  }

  private checkAvailableCompaniesForDownScroll(): void {
    const loadedItemsLength: number = this._companyService.allLoadedCompaniesSnapshot.length;
    const availableItems: number = loadedItemsLength - this._companyService.indexCompanies;
    if (availableItems < PRELOAD_ITEM_SIZE) {
      this._companyService.getCompanies();
    }
  }
}
