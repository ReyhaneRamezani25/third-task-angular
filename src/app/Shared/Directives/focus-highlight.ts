import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusHighlight]'
})
export class FocusHighlight {

  constructor(private _elRef : ElementRef , private _renderer : Renderer2) { }

  changeBackground(color : string){
    this._renderer.setStyle(
      this._elRef.nativeElement,
      'backgroundColor',
       color
    )
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.changeBackground('lightblue');
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.changeBackground('');
  }

}
