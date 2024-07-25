import {Component, OnInit} from '@angular/core';
import {FilterFormViewModel} from "../data/view-models/filter-form.view-model";
import {IFilterCompanies} from "../data/models/filter-companies.interface";
import {ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DestroyService} from "@core";
import {debounceTime, tap} from "rxjs";
import {CompanyFilterService} from "@core";

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './company-filter.component.html',
  styleUrl: './styles/company-filter.component.scss',
  providers: [DestroyService]
})
export class CompanyFilterComponent implements OnInit {
  protected _filterCompaniesForm!: FilterFormViewModel;

  constructor(protected readonly _companyFilterService: CompanyFilterService, private readonly _destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribeOnFormChanges();
  }

  private initForm(model: IFilterCompanies = {} as IFilterCompanies) {
    this._filterCompaniesForm = new FilterFormViewModel(model);
    this._filterCompaniesForm.fromModel({type: '', industry: '', business_name: ''} as IFilterCompanies);
  }

  protected resetForm(): void {
    this._filterCompaniesForm.fromModel({type: '', industry: '', business_name: ''} as IFilterCompanies);
    this._companyFilterService.updateCompaniesByModel({type: '', industry: '', business_name: ''})
  }

  private subscribeOnFormChanges(): void {
    this._filterCompaniesForm.form.valueChanges
      .pipe(
        debounceTime(500),
        tap((v) => this._companyFilterService.updateCompaniesByModel(v as IFilterCompanies))
      ).subscribe()
  }
}
