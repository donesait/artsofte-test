import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle
  ],
  templateUrl: './button.component.html',
  styleUrl: './styles/button.component.scss'
})
export class ButtonComponent {
  @Input() public click: () => void = (): void => {};
  @Input() public disabled?: boolean = false;
  @Input() public routerLink: string | string[] | null = null;
  @Input() backgroundColor?: string;
}
