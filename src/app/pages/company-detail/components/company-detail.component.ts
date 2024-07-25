import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, map, takeUntil, tap} from "rxjs";
import {DestroyService} from "../../../core";
import {CompanyDetailService} from "../services/company-detail.service";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../../feature-modules";

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './styles/company-detail.component.scss',
  providers: [DestroyService, CompanyDetailService]
})
export class CompanyDetailComponent {
  protected _backUrl!: string;

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute, protected readonly _companyDetailService: CompanyDetailService, private readonly _destroy$: DestroyService) {
    this.getInfoFromRoute();
  }

  protected navigateToBackUrl(): void {
    this._router.navigate([this._backUrl]);
  }


  private getInfoFromRoute(): void {
    this.getCompanyIdFromParams();
    this.getBackUrlFromQueryParams();
  }


  private getCompanyIdFromParams(): void {
    this._activatedRoute.params.pipe(
      filter((params: Params) => params.hasOwnProperty('companyId')),
      map((params: Params) => params['companyId']),
      tap((companyId: number) => this._companyDetailService.getCompanyById(companyId)),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  private getBackUrlFromQueryParams(): void {
    this._activatedRoute.queryParams.pipe(
      filter((params: Params) => params.hasOwnProperty('back-url')),
      map((params: Params) => params['back-url']),
      tap((url: string) => this._backUrl = url),
      takeUntil(this._destroy$),
    ).subscribe();
  }
}
