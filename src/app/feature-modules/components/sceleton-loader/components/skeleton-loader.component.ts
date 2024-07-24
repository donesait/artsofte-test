import {Component} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './styles/skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
}
