import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appAddElementId]',
  standalone: true
})
export class AddElementIdDirective implements OnInit {
  @Input() public set indexx(value: number) {
    if (value === 19) {
      this._elementRef.nativeElement.id = 'down'
    }
    if (value == 30) {
      this._elementRef.nativeElement.id = 'up'

    }
  }

  constructor(private readonly _elementRef: ElementRef) {
  }

  public ngOnInit(): void {

  }

}
