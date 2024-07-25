import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent, LoadingBarComponent} from "@feature-modules";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink, LoadingBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements OnInit {
  public title: string = 'artsofte-test';
  public ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
