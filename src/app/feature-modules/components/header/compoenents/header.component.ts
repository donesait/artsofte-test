import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/components/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './styles/header.component.scss'
})
export class HeaderComponent {

}
