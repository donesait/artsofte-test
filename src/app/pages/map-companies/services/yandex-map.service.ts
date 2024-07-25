import {Injectable} from '@angular/core';
import {ICoordinates} from "../data/models/coordinates.interface";
import {BehaviorSubject, filter, map, Observable, take, tap} from "rxjs";
import {CompanyService} from "@core";
import {ICompanyBase} from "../../../core/models";
import {ICompanyShortInformation} from "../data/models/company-short-information.type";

@Injectable()
export class YandexMapService {
  private readonly _currentCoordinates: BehaviorSubject<ICoordinates> = new BehaviorSubject<ICoordinates>({} as ICoordinates);
  private _allCompaniesShortInformation$: BehaviorSubject<ICompanyShortInformation[]> = new BehaviorSubject<ICompanyShortInformation[]>([]);

  constructor(private readonly _companyService: CompanyService) {
    this.getShortCompaniesInformation()
  }

  public updateCoordinates(coordinates: ICoordinates): void {
    this._currentCoordinates.next(coordinates);
  }

  public get currentCoordinates$(): Observable<ICoordinates> {
    return this._currentCoordinates.asObservable();
  }

  public get allCompaniesShortInformation$(): Observable<ICompanyShortInformation[]> {
    return this._allCompaniesShortInformation$.asObservable()
  }

  private getShortCompaniesInformation(): void {
    this._companyService.allLoadedCompanies$.pipe(
      filter((companies: ICompanyBase[]): boolean => companies.length > 0),
      map((companies: ICompanyBase[]) => companies.slice(0, 100)),
      map((companies: ICompanyBase[]): ICompanyShortInformation[] => companies.map((company: ICompanyBase): ICompanyShortInformation => ({
        latitude: company.latitude,
        type: company.type,
        phone_number: company.phone_number,
        id: company.id,
        business_name: company.business_name,
        longitude: company.longitude
      }))),
      tap((shortInformation: ICompanyShortInformation[]) => this._allCompaniesShortInformation$.next(shortInformation)),
      take(1)
    ).subscribe();

  }
}
