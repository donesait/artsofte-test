import { Injectable } from '@angular/core';
import {CompanyService, DestroyService} from "../../../../core";
import {filter, map, takeUntil, tap} from "rxjs";
import {ICompanyBase} from "../../../../core/models";

@Injectable()
export class CompanyDetailService {
  private _company!: ICompanyBase;

  constructor(private readonly _companyService: CompanyService, private readonly _destroy$: DestroyService) { }

  public getCompanyById(companyId: number): void {
    this._companyService.companies$
      .pipe(
        filter((companies: ICompanyBase[]) => companies.some((company: ICompanyBase): boolean => company.id == companyId)),
        map((companies: ICompanyBase[]) => companies.find((company: ICompanyBase): boolean => company.id == companyId)!),
        tap((company: ICompanyBase) => this._company = company),
        takeUntil(this._destroy$),
      ).subscribe();
  }

  public get company(): ICompanyBase {
    return this._company;
  }
}
