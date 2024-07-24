import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlightHover]',
  standalone: true
})
export class HighlightHoverDirective {

  constructor(private readonly _elementRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this._elementRef.nativeElement.style.opacity = 0.5;
  }

  @HostListener('mouseout') onMouseOut() {
    this._elementRef.nativeElement.style.opacity = 1;
  }
}
