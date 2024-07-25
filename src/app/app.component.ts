import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./feature-modules/components/header/compoenents/header.component";
import {LoadingBarComponent} from "./feature-modules/components/loading-bar/loading-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
