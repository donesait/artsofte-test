import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {CompanyService} from "@core";
import {tap} from "rxjs";

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './loading-bar.component.html',
  styleUrl: './styles/loading-bar.component.scss'
})
export class LoadingBarComponent implements OnInit {
  protected isLoading = false;
  constructor(private readonly _companyService: CompanyService) {
  }

  ngOnInit(): void {
        this._companyService.isLoading$.pipe(
          tap((state: boolean)=> this.isLoading = state)
        ).subscribe()
    }
}
