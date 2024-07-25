import {FormControl} from "@angular/forms";
import {SortType} from "@core";

export interface SortForm {
  type: FormControl<SortType>;
}
