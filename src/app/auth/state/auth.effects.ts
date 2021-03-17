import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { loginStart, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>) { }


    login$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(loginStart),
                exhaustMap((action) => {
                    return this.authService.login(action.email, action.password)
                        .pipe(
                            tap((data) => {
                                this.store.dispatch(setLoadingSpinner({ status: false }));
                            }),
                            map((data) => {
                                const user = this.authService.formatUser(data);
                                console.log('user', user);
                                return loginSuccess({ user });
                            })
                        )
                })
            )
    });

}