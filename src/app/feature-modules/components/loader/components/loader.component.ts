import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './loader.component.html',
  styleUrl: './styles/loader.component.scss'
})
export class LoaderComponent {
  @Input() public width!: number;
}
