import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./feature-modules/components/layout/components/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
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
