import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BASE_API_TOKEN} from "../injection-tokens";
import {BehaviorSubject, map, Observable, Subscription, tap, throttleTime} from "rxjs";
import {enviroment} from "../../../enviroments/enviroment";
import {ICompanyBase} from "../models";
import {LocalStorageService} from "./local-storage.service";
import {DATA_KEY, SELECT_STORE_KEY} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly _allLoadedCompanies$: BehaviorSubject<ICompanyBase[]> = new BehaviorSubject<ICompanyBase[]>([]);
  private readonly _companies$: BehaviorSubject<ICompanyBase[]> = new BehaviorSubject<ICompanyBase[]>([]);
  private readonly _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _indexCompanies: number = 0;

  constructor(@Inject(BASE_API_TOKEN) private readonly _baseUrl: string, private readonly _httpClient: HttpClient, private readonly _storageService: LocalStorageService) {
    if (this._storageService.getData(SELECT_STORE_KEY) === 'localstorage') {
      if (this._storageService.getData(DATA_KEY)) {
        this._allLoadedCompanies$.next(JSON.parse(this._storageService.getData(DATA_KEY)!))
        this.updateCompanies();
      } else {
        this.getCompanies();
      }
    } else {
      this._storageService.saveData(SELECT_STORE_KEY, 'application')
      this.getCompanies();
    }
  }

  public getCompanies(): Subscription {
    return this.fetchCompanies().pipe(
      map((response: ICompanyBase[]): ICompanyBase[] => [...this._allLoadedCompanies$.value, ...response]),
      tap((companies: ICompanyBase[]): void => {
        this._allLoadedCompanies$.next(companies);
        if (this._storageService.getData(SELECT_STORE_KEY) === 'localstorage') {
          this._storageService.saveData(DATA_KEY, JSON.stringify(this._allLoadedCompanies$.value))
        }
        this.updateCompanies();
      })
    ).subscribe();
  }

  public updateCompanies(): void {
    if (!this._indexCompanies) {
      this._companies$.next(this._allLoadedCompanies$.value.slice(0, enviroment.showItemsCount))
      this._indexCompanies += enviroment.showItemsCount;
      this._isLoading$.next(false)
    }
  }

  public get indexCompanies(): number {
    return this._indexCompanies;
  }

  public set indexCompanies(index: number) {
    if (!isNaN(index)) {
      this._indexCompanies = index;
    }
  }

  public get allLoadedCompaniesSnapshot(): ICompanyBase[] {
    return this._allLoadedCompanies$.value;
  }

  public get allLoadedCompanies$(): Observable<ICompanyBase[]> {
    return this._allLoadedCompanies$.asObservable();
  }

  public set companies(companies: ICompanyBase[]) {
    this._companies$.next(companies);
  }

  public get companiesSnapshot(): ICompanyBase[] {
    return this._companies$.value;
  }

  public get companies$(): Observable<ICompanyBase[]> {
    return this._companies$.asObservable().pipe(throttleTime(200))
  }

  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  private fetchCompanies(): Observable<ICompanyBase[]> {
    return this._httpClient.get<ICompanyBase[]>(this._baseUrl, {
      params: new HttpParams().append('size', 100),
      responseType: 'json',
      // reportProgress: true,
      // observe: 'events'
    }).pipe()
  }
}
