import {Component, Input} from '@angular/core';
import {JsonPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {ICompanyBase} from "../../../../core/models";

@Component({
  selector: 'app-company-item',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    NgOptimizedImage,
  ],
  templateUrl: './company-item.component.html',
  styleUrl: './styles/company-item.component.scss',
})
export class CompanyItemComponent {
  @Input({required: true}) public company!: ICompanyBase;
  @Input() public index!: number;
}
