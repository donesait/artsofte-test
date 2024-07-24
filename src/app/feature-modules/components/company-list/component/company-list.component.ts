import {ChangeDetectorRef, Component, OnInit, SkipSelf} from '@angular/core';
import {CompanyService, ScrollDirection, trackByFn} from "../../../../core";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CompanyItemComponent} from "../../company-item/components/company-item.component";
import {LoaderComponent} from "../../loader/components/loader.component";
import {ObserveElementDirective} from "../../../directives";
import {Router} from "@angular/router";
import {CompanyScrollService} from "../services/company-scroll.service";
import {SortingCompaniesService} from "../../../../core/services/sorting-companies.service";
import {animate, stagger, style, transition, trigger} from "@angular/animations";
import {tap} from "rxjs";

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgForOf,
    CompanyItemComponent,
    NgIf,
    LoaderComponent,
    ObserveElementDirective,
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './style/company-list.component.scss',
  providers: [CompanyScrollService],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(100, [
          animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ])
    ])
  ]
})
export class CompanyListComponent implements OnInit {
  constructor(@SkipSelf() protected readonly _companyService: CompanyService, private readonly _cd: ChangeDetectorRef, private readonly _router: Router, private readonly _sortingCompaniesService: SortingCompaniesService, private readonly _companyScrollService: CompanyScrollService) {

  }

  ngOnInit(): void {
    this._companyService.companies$.pipe(
      tap((v) => {
        this._cd.detectChanges();
      })
    ).subscribe()
    }


  protected onScroll(direction: ScrollDirection): void {

    this._companyScrollService.addCompanies(direction);

    // this._sortingCompaniesService.startSorting();
  }

  protected navigateToDetailPage(companyId: number): void {
    this._router.navigate(['detail', companyId], {queryParams: {'back-url': 'list'}})
  }
}
