import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

type authRole = 'READ' | 'WRITE' | 'EDIT' | 'GRANT' | 'ADMIN';

interface userIdentity {
  identifier: string | null;
  nickname: string | null;
  roles: authRole[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends AuthService {
  // private data$: Observable<userIdentity>;
  private userChange$: BehaviorSubject<userIdentity>;

  constructor(
    protected override http: HttpClient,
    // protected override router: Router,
    @Inject(PLATFORM_ID) protected override platformId: InjectionToken<Object>
  ) {
    super(http, platformId);
    // this.data$ = this.http.get<userIdentity>(`${this.url}/user`);
    this.userChange$ = new BehaviorSubject<userIdentity>({
      identifier: null,
      nickname: null,
      roles: [],
    });

    if (this.loggedIn) this.update();
  }

  update(): void {
    // this.data$.subscribe({
    //   next: (user) => {
    //     this.userChange$.next(user);
    //   },
    //   error: this.destroy,
    // });
  }

  destroy(): void {
    this.userChange$.next({
      identifier: null,
      nickname: null,
      roles: [],
    });
  }

  get userSync() {
    return this.userChange$.asObservable().pipe(
      skipWhile(({ identifier }) => {
        return !identifier && this.loggedIn;
      }),
    );
  }

  get getId(): string | null {
    return this.userChange$.getValue().identifier;
  }

  get logged(): boolean {
    return !!this.getId;
  }

  isEqualTo(_id: string): boolean {
    return this.getId === _id;
  }

  get getNickname(): string | null {
    return this.userChange$.getValue().nickname;
  }

  get getRoles(): authRole[] {
    return this.userChange$.getValue().roles;
  }

  hasRole(...roles: authRole[]): boolean {
    return roles.some((r) => this.getRoles.includes(r));
  }
}
