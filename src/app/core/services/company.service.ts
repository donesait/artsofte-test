import {ChangeDetectorRef, Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {BASE_API_TOKEN} from "../injection-tokens";
import {BehaviorSubject, filter, map, Observable, Subscription, tap, throttleTime} from "rxjs";
import {enviroment} from "../../../enviroments/enviroment";
import {ICompanyBase} from "../models";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly _allLoadedCompanies$: BehaviorSubject<ICompanyBase[]> = new BehaviorSubject<ICompanyBase[]>([]);
  private readonly _companies$: BehaviorSubject<ICompanyBase[]> = new BehaviorSubject<ICompanyBase[]>([]);
  public readonly _defaultSortedCompanies$: BehaviorSubject<ICompanyBase[]> = new BehaviorSubject<ICompanyBase[]>([]);
  private readonly _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _indexCompanies: number = 0;


  constructor(@Inject(BASE_API_TOKEN) private readonly _baseUrl: string, private readonly _httpClient: HttpClient) {
    this.getCompanies();
  }

  public getCompanies(): Subscription {
    return this.fetchCompanies().pipe(
      filter((events: HttpEvent<ICompanyBase[]>): boolean => {
        if (events.type === HttpEventType.Response) {
          this._isLoading$.next(false);
          return true;
        } else {
          if (this._isLoading$.value) {
            return false;
          }
          this._isLoading$.next(true);
          return false;
        }
      }),
      /* Никак не протипизировать */
      map((response: any): ICompanyBase[] => {

        return response.body.map((t: any, index: number) => ({...t,i : index}));
      }),
      tap((companies: ICompanyBase[]): void => {
        this._allLoadedCompanies$.next([...this._allLoadedCompanies$.value, ...companies]);
        this.updateCompanies();
      })
    ).subscribe();
  }

  public updateCompanies(): void {
    if (!this._indexCompanies) {
      this._companies$.next(this._allLoadedCompanies$.value.slice(0, enviroment.showItemsCount))
      this._indexCompanies += enviroment.showItemsCount;
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

  public set companiesSet (companies: ICompanyBase[]) {
    // console.log('l')
    if (companies.length) {
      this._companies$.next(companies);
    }
  }

  public get companiesSnapshot(): ICompanyBase[] {
    return this._companies$.value;
  }

  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public get companies$(): Observable<ICompanyBase[]> {
    return this._companies$.asObservable().pipe(throttleTime(200))
  }

  private fetchCompanies(): Observable<HttpEvent<ICompanyBase[]>> {
    return this._httpClient.get<ICompanyBase[]>(`https://random-data-api.com/api/company/random_company?size=100`, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
