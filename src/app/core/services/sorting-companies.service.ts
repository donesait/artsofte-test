import {Injectable} from '@angular/core';
import {BehaviorSubject, skip, takeUntil, tap} from "rxjs";
import {SortType} from "../enums";
import {CompanyService} from "./company.service";
import {DestroyService} from "./destroy.service";
import {ICompanyBase} from "../models";
import {enviroment} from "../../../enviroments/enviroment";
import {SortFileds} from "../types";

@Injectable()
export class SortingCompaniesService {
  private readonly _sortType$: BehaviorSubject<SortType> = new BehaviorSubject<SortType>(SortType.Default);

  constructor(private readonly _companyService: CompanyService, private readonly _destroy$: DestroyService) {
    this.subscribeOnObservable();
  }

  public updateSortType(sortType: SortType): void {
    if (typeof sortType === 'number' && sortType !== this._sortType$.value) {
      this._sortType$.next(sortType)
    }
  }

  public startSorting(companies?: ICompanyBase[]): ICompanyBase[] {
    switch (this._sortType$.value) {
      case SortType.Default: {
        return companies
          ? companies
          : this._companyService.companies = this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies - enviroment.showItemsCount, this._companyService.indexCompanies);
      }
      case SortType.Name: {
        return companies
          ? this.sortByField(companies, 'business_name')
          : this._companyService.companies = this.sortByField(this._companyService.companiesSnapshot, 'business_name');
      }
      case SortType.Industry: {
        return companies
          ? this.sortByField(companies, 'industry')
          : this._companyService.companies = this.sortByField(this._companyService.companiesSnapshot, 'industry');
      }
      case SortType.Type: {
        return companies
          ? this.sortByField(companies, 'type')
          : this._companyService.companies = this.sortByField(this._companyService.companiesSnapshot, 'type');
      }
    }
  }

  private sortByField(companies: ICompanyBase[], field: SortFileds): ICompanyBase[] {
    return companies.sort((curr: ICompanyBase, prev: ICompanyBase): number => curr[field].localeCompare(prev[field]))
  }

  private subscribeOnObservable(): void {
    this._sortType$
      .pipe(
        skip(1),
        tap(() => this.startSorting()),
        takeUntil(this._destroy$)
      ).subscribe();
  }
}
