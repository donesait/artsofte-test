import {ChangeDetectorRef, Injectable} from '@angular/core';
import {CompanyService, ScrollDirection} from "../../../../core";
import {enviroment} from "../../../../../enviroments/enviroment";
import {PRELOAD_ITEM_SIZE} from "../data/constants/preload-items-size.constant";
import {ICompanyBase} from "../../../../core/models";
import {SortingCompaniesService} from "../../../../core/services/sorting-companies.service";

@Injectable()
export class CompanyScrollService {

  constructor(private readonly _companyService: CompanyService, private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _cd: ChangeDetectorRef) {
  }

  public addCompanies(scrollDirection: ScrollDirection): void {
    const actualPostArray: ICompanyBase[] = this.getActualArray(scrollDirection);
    if (scrollDirection === ScrollDirection.Up) {
      this._companyService.indexCompanies = this._companyService.indexCompanies - PRELOAD_ITEM_SIZE;
      window.scrollTo({top: window.innerHeight * 4.9232131});
    } else {
      this._companyService.indexCompanies = this._companyService.indexCompanies + PRELOAD_ITEM_SIZE;
      this.checkAvailableCompaniesForDownScroll();
    }

    this._companyService.companies = actualPostArray;
  }

  private getActualArray(scrollDirection: ScrollDirection): ICompanyBase[] {
    return scrollDirection === ScrollDirection.Up
       ? [...this._sortingCompaniesService.startSorting(this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies - PRELOAD_ITEM_SIZE * 2, this._companyService.indexCompanies - PRELOAD_ITEM_SIZE)), ...this._companyService.companiesSnapshot.slice(0, enviroment.showItemsCount - PRELOAD_ITEM_SIZE)]
    : [...this._companyService.companiesSnapshot.slice(-(enviroment.showItemsCount - PRELOAD_ITEM_SIZE)), ...this._sortingCompaniesService.startSorting(this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies, this._companyService.indexCompanies + PRELOAD_ITEM_SIZE))]
  }

  private checkAvailableCompaniesForDownScroll(): void {
    const loadedItemsLength: number = this._companyService.allLoadedCompaniesSnapshot.length;
    const availableItems: number = loadedItemsLength - this._companyService.indexCompanies;
    if (availableItems < PRELOAD_ITEM_SIZE) {
      this._companyService.getCompanies();
    }
  }
}
