import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {SortType} from "../../../../core";
import {SortForm} from "../data/models/sort-form.type";
import {NgClass, NgIf} from "@angular/common";
import {HighlightHoverDirective} from "../../../directives";
import {tap} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-sort-control',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, HighlightHoverDirective],
  templateUrl: './sort-control.component.html',
  styleUrl: './styles/sort-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortControlComponent),
      multi: true
    }
  ]
})
export class SortControlComponent implements ControlValueAccessor {

  private onChangeHook!: (value: SortType) => void;
  protected readonly SortType = SortType;
  protected _sortForm!: FormGroup<SortForm>;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.initSortForm();
  }

  private initSortForm(): void {
    this._sortForm = this._formBuilder.group<SortForm>({
      type: this._formBuilder.nonNullable.control(SortType.Default),
    });
  }

  protected changeType(type: SortType): void {
    this.writeValue(type);
  }

  public writeValue(value: SortType): void {
    if (this.onChangeHook) {
      this.onChangeHook(value)
    }
  }

  public registerOnChange(fn: (value: SortType) => void): void {
    this.onChangeHook = fn;
  }

  public registerOnTouched(): void {
  }

  protected isActive(value: SortType):boolean {
    return this._sortForm.controls.type.value === value;
  }
}
