import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { BehaviorSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

interface userIdentity {
  _id: string | null;
  name: string | null;
}

type User = {
  _id: {
    $oid: any;
  };
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends AuthService {
  private userChange$: BehaviorSubject<userIdentity>;

  constructor(
    protected override http: HttpClient,
    protected override router: Router,
    @Inject(PLATFORM_ID) protected override platformId: InjectionToken<Object>
  ) {
    super(http, router, platformId);
    this.userChange$ = new BehaviorSubject<userIdentity>({
      _id: null,
      name: null,
    });
  }

  update({ _id, name }: User): void {
    this.userChange$.next({
      _id: _id.$oid,
      name
    });
  }

  destroy(): void {
    this.userChange$.next({
      _id: null,
      name: null,
    });
  }

  get userSync() {
    return this.userChange$.asObservable().pipe(
      skipWhile(({ _id }) => {
        return !_id && this.loggedIn;
      }),
    );
  }

  get getId(): string | null {
    return this.userChange$.getValue()._id;
  }

  get logged(): boolean {
    return !!this.getId;
  }

  isEqualTo(_id: string): boolean {
    return this.getId === _id;
  }

  get getName(): string | null {
    return this.userChange$.getValue().name;
  }
}
