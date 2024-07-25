import {IFilterCompaniesForm} from "../models/filter-companies-form.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {IFilterCompanies} from "../models/filter-companies.interface";

export class FilterFormViewModel {

  private _form!: FormGroup<IFilterCompaniesForm>;

  public get controlMap(): IFilterCompaniesForm {
    return this._form.controls;
  }

  public get form(): FormGroup<IFilterCompaniesForm> {
    return this._form;
  }

  private getControls(): IFilterCompaniesForm {
    return {
      business_name: new FormControl(),
      industry: new FormControl(),
      type: new FormControl()
    };
  }

  constructor(private readonly _model: IFilterCompanies) {
    this.setForm();
  }

  public fromModel(model: IFilterCompanies): void {
    this.controlMap.business_name.patchValue(model.business_name!, {onlySelf: true, emitEvent: false})
    this.controlMap.industry.patchValue(model.industry!, {onlySelf: true, emitEvent: false})
    this.controlMap.type.patchValue(model.type!, {onlySelf: true, emitEvent: false})
  }

  public updateModel(model: IFilterCompanies): void {
    model.business_name = this.controlMap.business_name.value;
    model.industry = this.controlMap.industry.value;
    model.type = this.controlMap.type.value;
  }

  private setForm(): void {
    this._form = new FormGroup<IFilterCompaniesForm>(this.getControls());
  }
}
