import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, filter, fromEvent, map, of, switchAll, switchMap, takeUntil, tap, throttleTime} from "rxjs";
import {CompanyService, DestroyService} from "../../core";
import {ScrollDirection} from "../../core";
import {Location} from "@angular/common";

@Directive({
  selector: '[appObserveElement]',
  exportAs: 'intersection',
  standalone: true,
  providers: [DestroyService]
})
export class ObserveElementDirective implements OnInit {
  @Input() public distance: number = 100;
  @Input() public throttle: number = 500;
  @Output() public scrolled: EventEmitter<ScrollDirection> = new EventEmitter<ScrollDirection>();

  private _loadDownCount: number = 0;

  constructor(private readonly _elementRef: ElementRef, private readonly _destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    fromEvent(window, 'scroll').pipe(
      map((): number => {
        const scrollTop: number = window.pageYOffset;
        const scrollHeight: number = document.documentElement.scrollHeight;
        const clientHeight: number = document.documentElement.clientHeight;

        if (scrollTop + clientHeight + this.distance >= scrollHeight) {
          return ScrollDirection.Down;
        } else if (scrollTop <= this.distance && this._elementRef.nativeElement.scrollTop === 0 && this.canLoadUp()) {
          return ScrollDirection.Up;
        }
        return ScrollDirection.Skip;
      }),
      filter((state: number): boolean => state !== ScrollDirection.Skip),
      throttleTime(this.throttle),
      tap((direction: ScrollDirection) => this.checkScroll(direction)),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  private checkScroll(direction: ScrollDirection): void {
    if (direction === ScrollDirection.Down) {
      this._loadDownCount += 1;
      this.scrolled.emit(ScrollDirection.Down);
    } else {
      this.scrolled.emit(ScrollDirection.Up);
    }
  }

  private canLoadUp(): boolean {
    if (this._loadDownCount >= 1) {
      this._loadDownCount -= 1;
      return true;
    }
    return false;
  }
}
