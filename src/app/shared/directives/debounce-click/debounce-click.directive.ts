import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[debounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounce_time;
  @Output() debounce_click: EventEmitter<MouseEvent>;
  private clicks: Subject<MouseEvent>;
  private subscription: Subscription;

  constructor() {
    this.debounce_time = 500;
    this.debounce_click = new EventEmitter();
    this.clicks = new Subject();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounce_time)
    ).subscribe({
      next: (event) => this.debounce_click.emit(event),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}