import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, skip, takeUntil, tap} from "rxjs";
import {SortType} from "../enums";
import {CompanyService} from "./company.service";
import {DestroyService} from "./destroy.service";
import {ICompanyBase} from "../models";
import {enviroment} from "../../../enviroments/enviroment";
import {
  PRELOAD_ITEM_SIZE
} from "../../feature-modules/components/company-list/data/constants/preload-items-size.constant";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable()
export class SortingCompaniesService {
  private readonly _sortType$: BehaviorSubject<SortType> = new BehaviorSubject<SortType>(SortType.Default);


  constructor(private readonly _companyService: CompanyService, private readonly _destroy$: DestroyService) {
    this.subscribeOnObservable();
  }

  public get sortType$(): Observable<SortType> {
    return this._sortType$.asObservable();
  }

  public updateSortType(sortType: SortType): void {
    if (typeof sortType === 'number' && sortType !== this._sortType$.value) {
      this._sortType$.next(sortType)
    }
  }

  public startSorting(companies?: ICompanyBase[]) {
debugger
    // console.log(companies)
    switch (this._sortType$.value) {
      case SortType.Default: {
        return companies ? companies : this._companyService.companiesSet = this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies - enviroment.showItemsCount , this._companyService.indexCompanies);
      }
      case SortType.Name: {
        // console.log('p[')
        if (companies) {
          let a = this.sortCByName(companies);
          console.log(a)
          return a
        } else {
           this._companyService.companiesSet = this.sortCByName(this._companyService.companiesSnapshot);
        }
        return this._companyService.companiesSnapshot;
      }
      case SortType.Industry: {
        return companies ? this.sortByIndustry(companies) : this._companyService.companiesSet = this.sortByIndustry(this._companyService.companiesSnapshot)
      }
      case SortType.Type: {
        return companies ? this.sortByType(companies) : this._companyService.companiesSet = this.sortByType(this._companyService.companiesSnapshot)
      }
    }
  }

  private sortCByName(companies: ICompanyBase[]) : ICompanyBase[] {
    return companies.sort((c, item) => Number(c.business_name > item.business_name))
  }

  private sortByIndustry(companies: ICompanyBase[]) {
    return companies.sort((c, item) => Number(c.industry > item.industry))
  }

  private sortByType(companies: ICompanyBase[]) : ICompanyBase[] {
    return companies.sort((c, item) => Number(c.type > item.type))
  }


  private subscribeOnObservable(): void {
    this._sortType$
      .pipe(
        skip(1),
        tap((v) => {
          console.log(v)
          return this.startSorting()
        }),
        takeUntil(this._destroy$)
      ).subscribe();
  }
}
