import { Component } from '@angular/core';
import {HeaderComponent, LoadingBarComponent} from "@feature-modules";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    LoadingBarComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './styles/layout.component.scss'
})
export class LayoutComponent {

}
