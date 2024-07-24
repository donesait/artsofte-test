import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortControlComponent} from "../../sort-control/components/sort-control.component";
import {DestroyService, SortType} from "../../../../core";
import {SortingCompaniesService} from "../../../../core/services/sorting-companies.service";
import {debounceTime, takeUntil, tap, throttleTime} from "rxjs";

@Component({
  selector: 'app-company-sort',
  standalone: true,
  imports: [
    FormsModule,
    SortControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './company-sort.component.html',
  styleUrl: './styles/company-sort.component.scss',
  providers: [DestroyService]
})
export class CompanySortComponent implements OnInit {

  protected _sortControl!: FormControl<SortType>;

  constructor(private readonly _destroy$: DestroyService, private readonly _sortingCompaniesService: SortingCompaniesService) {
  }

  public ngOnInit(): void {
    this.initFormControl();
  }

  private initFormControl(): void {
    this._sortControl = new FormControl()
    this._sortControl.valueChanges.pipe(
      debounceTime(200),
      tap((sortType: SortType) => this._sortingCompaniesService.updateSortType(sortType)),
      takeUntil(this._destroy$)
    ).subscribe();
  }
}
