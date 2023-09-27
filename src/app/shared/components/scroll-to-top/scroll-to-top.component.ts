import { ViewportScroller } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'scroll-to-top',
  template: '',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {
  private toogle_ratio: number;
  @HostBinding('class.showBtn') show_btn: boolean;

  constructor(
    private _scroll: ViewportScroller,
  ) {
    this.toogle_ratio = 0.5;
    this.show_btn = false;
  }

  @HostListener('window:scroll', ['$event']) onScroll({
    target: {
      documentElement: { scrollHeight, clientHeight, scrollTop },
    },
  }: Event & { target: Document }): void {
    const total = scrollHeight - clientHeight;
    const percent = scrollTop / total;
    this.show_btn = percent > this.toogle_ratio ?? false;
  }

  @HostListener('click') onClick(): void {
    this._scroll.scrollToPosition([0, 0]);
  }
}