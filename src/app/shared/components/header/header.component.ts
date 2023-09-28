import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '@core/services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'navbar navbar-expand-md navbar-dark bg-dark px-2',
  },
})
export class HeaderComponent {
  is_collapsed: boolean;

  constructor(
    private user: UserService,
    private location: Location,
  ) {
    this.is_collapsed = true;
  }

  get logged() {
    return this.user.logged;
  }

  collapse(): void {
    this.is_collapsed = !this.is_collapsed;
  }

  return(): void {
    this.location.back();
  }

  logout(): void {
    this.user.destroy();
    this.user.logout();
  }
}
