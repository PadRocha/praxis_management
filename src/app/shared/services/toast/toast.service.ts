import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export interface ToastInfo {
  header: string;
  type: 'success' | 'warning' | 'danger';
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ToastInfo[];

  constructor(
    @Inject(PLATFORM_ID) private _plataform: Object,
  ) {
    this.toasts = [];
  }

  show(
    header: string,
    type: 'success' | 'warning' | 'danger',
  ): void {
    if (isPlatformBrowser(this._plataform)) {
      let delay: number;
      switch (type) {
        case 'success':
          delay = 5_000;
          break;
        case 'warning':
          delay = 10_000;
          break;
        case 'danger':
          delay = 20_000;
          break;
        default:
          delay = 0;
          break;
      }
      this.toasts.push({ header, type, delay });
    }
  }

  remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  get(): ToastInfo[] {
    return this.toasts;
  }

  clear(): void {
    this.toasts.splice(0, this.toasts.length);
  }
}
