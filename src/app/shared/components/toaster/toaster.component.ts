import { Component } from '@angular/core';
import { ToastInfo, ToastService } from '@shared/services';

@Component({
  selector: 'toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  constructor(
    private _toast: ToastService,
  ) { }

  className({ type }: ToastInfo) {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'danger':
        return 'bg-danger';
    }
  }

  get toasts() {
    return this._toast.get();
  }

  remove(toast: ToastInfo): void {
    this._toast.remove(toast);
  }
}
