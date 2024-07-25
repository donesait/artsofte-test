import {FormControl} from "@angular/forms";

export interface IFilterCompaniesForm {
  business_name: FormControl<string>;
  industry: FormControl<string>;
  type: FormControl<string>;
}
