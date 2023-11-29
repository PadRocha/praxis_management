import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Inject, NgZone, OnDestroy, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';

@Pipe({
    name: 'timeAgo',
    pure: false,
    standalone: true,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer: number | null;

  constructor(
    private _change: ChangeDetectorRef,
    private _zone: NgZone,
    @Inject(PLATFORM_ID) private _plataform: Object,
  ) {
    this.timer = 0;
  }

  private removeTimer(): void {
    if (!!this.timer && isPlatformBrowser(this._plataform)) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number): number {
    const min = 60;
    const hrs = min * 60;
    const day = hrs * 24;
    if (seconds < min) {
      return 2;
    } else if (seconds < hrs) {
      return 30;
    } else if (seconds < day) {
      return 300;
    } else {
      return 3_600;
    }
  }

  transform(value: string): string {
    this.removeTimer();
    const day = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - day.getTime()) / 1_000));
    const update = Number.isNaN(seconds)
      ? 1_000
      : this.getSecondsUntilUpdate(seconds) * 1_000;

    this.timer = this._zone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this._zone.run(this._change.markForCheck);
        }, update);
      }
      return null;
    });

    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));

    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return 'hace unos segundos';
    } else if (seconds <= 90) {
      return 'hace un minuto';
    } else if (minutes <= 45) {
      return `hace ${minutes} minutos`;
    } else if (minutes <= 90) {
      return 'hace una hora';
    } else if (hours <= 22) {
      return `hace ${hours} horas`;
    } else if (hours <= 36) {
      return 'hace un día';
    } else if (days <= 25) {
      return `hace ${days} días`;
    } else if (days <= 45) {
      return 'hace un mes';
    } else if (days <= 345) {
      return `hace ${months} meses`;
    } else if (days <= 545) {
      return 'hace un año';
    } else {
      return `hace ${years} años`;
    }
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }
}
