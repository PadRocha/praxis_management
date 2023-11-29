import { isPlatformBrowser } from '@angular/common';
import { Directive, HostListener, Inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { ToastService } from '@shared/services';

@Directive({
    selector: 'a[copy]',
    standalone: true
})
export class CopyDirective {
  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private toast: ToastService,
  ) { }

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent): Promise<void> {
    const div = event.target as HTMLAnchorElement;
    const text = div.textContent;
    if (isPlatformBrowser(this.platformId) && text !== null) {
      await navigator.clipboard.writeText(text);
      this.toast.show('Copiado', 'success');
    }
  }
}
