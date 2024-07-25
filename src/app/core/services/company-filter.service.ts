import {Injectable} from '@angular/core';
import {CompanyService} from "../index";
import {BehaviorSubject, take, tap} from "rxjs";
import {ICompanyBase} from "../models";
import {IFilterCompanies} from "../../feature-modules/components/company-filter/data/models/filter-companies.interface";

@Injectable()
export class CompanyFilterService {
  private readonly _typeFilterOptions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly _industryFilterOptions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _currentFilterModel: IFilterCompanies = {} as IFilterCompanies;

  constructor(private readonly _companyService: CompanyService) {
    this.getOptions();
  }

  private getOptions(): void {
    this._companyService.allLoadedCompanies$
      .pipe(
        take(2),
        tap((companies: ICompanyBase[]): void => {
          this._typeFilterOptions.next([...new Set(companies.map((company: ICompanyBase) => company.type))])
          this._industryFilterOptions.next([...new Set(companies.map((company: ICompanyBase) => company.industry))])

        })
      ).subscribe();
  }


  public get industryOptions$() {
    return this._industryFilterOptions.asObservable();
  }

  public get typeOptions$() {
    return this._typeFilterOptions.asObservable();
  }

  public get currentFilterModel(): IFilterCompanies {
    return this._currentFilterModel;
  }

  public updateCompaniesByModel(filterModel: IFilterCompanies): void {
    if (this._currentFilterModel === filterModel) {
      return;
    }
    this._currentFilterModel = filterModel;
    this._companyService.companies =
      this.filterCompanies(this._companyService.allLoadedCompaniesSnapshot.slice(this._companyService.indexCompanies - 50, this._companyService.indexCompanies));
  }

  public filterCompanies(companies: ICompanyBase[]): ICompanyBase[] {
    const filterModel: IFilterCompanies = this.currentFilterModel;
    if (!filterModel.type && !filterModel.business_name && !filterModel.industry) {
      return companies;
    }
    return companies.filter((company: ICompanyBase): boolean => {
      const nameMatch: boolean = filterModel.business_name === '' || company.business_name.includes(filterModel.business_name);
      const industryMatch: boolean = filterModel.industry === '' || company.industry === filterModel.industry;
      const typeMatch: boolean = filterModel.type === '' || company.type === filterModel.type;
      return nameMatch && industryMatch && typeMatch;
    })
  }
}
