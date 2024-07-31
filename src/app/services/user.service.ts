import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { ApiService } from './api.service';
import { IJWTToken } from '../lib/interfaces/jwt-token';
import { AlertService } from './alert.service';
import { IUser } from '../lib/interfaces/user';
import { Router } from '@angular/router';

export type AuthUser = IUser | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private user: AuthUser = undefined;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private router: Router
  ) {}

  isLoadingSubject$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  getUser(): AuthUser | undefined {
    return this.user;
  }

  hasRole(userRole: string): boolean {
    if (this.user) {
      return this.user.roles.some(role => role.code === userRole);
    }
    return false;
  }

  login(email: string, password: string): Observable<string> {
    return this.apiService
      .get<IJWTToken>('/auth/login', { email, password })
      .pipe(
        takeUntil(this.destroy$),
        map(response => {
          if (response.code === 200) {
            localStorage.setItem('auth', JSON.stringify(response.data));
            this.isLoadingSubject.next(true);
            return '';
          } else {
            return (
              response.exception?.message ??
              'Erro desconhecido. Por favor tente novamente'
            );
          }
        })
      );
  }

  getUserByToken(): Observable<string> {
    this.isLoadingSubject.next(true);
    return this.apiService.fetch<AuthUser>('/auth/me').pipe(
      takeUntil(this.destroy$),
      catchError(_error => {
        localStorage.removeItem('auth');
        this.isLoadingSubject.next(false);
        return EMPTY;
      }),
      map(response => {
        if (response.code === 200) {
          this.user = response.data;
          this.isLoadingSubject.next(false);
          return '';
        } else {
          localStorage.removeItem('auth');
          this.isLoadingSubject.next(false);
          return (
            response.exception?.message ??
            'Erro desconhecido. Por favor tente novamente'
          );
        }
      })
    );
  }

  logOut(): void {
    this.isLoadingSubject.next(true);
    this.apiService
      .fetch<{ message: string }>('/auth/logout')
      .pipe(
        takeUntil(this.destroy$),
        catchError(_error => {
          this.user = undefined;
          localStorage.removeItem('auth');
          this.isLoadingSubject.next(false);
          this.router.navigate(['/']);

          return EMPTY;
        })
      )
      .subscribe(_response => {
        this.alertService.setAlert({
          code: 200,
          title: 'Saida com Sucesso',
          message: 'Obrigado e até breve',
        });
        this.user = undefined;
        localStorage.removeItem('auth');
        this.isLoadingSubject.next(false);
        this.router.navigate(['/']);
      });
  }

  forceExit(): void {
    this.isLoadingSubject.next(true);
    this.apiService
      .fetch<{ message: string }>('/auth/logout')
      .pipe(
        takeUntil(this.destroy$),
        catchError(_error => {
          this.user = undefined;
          localStorage.removeItem('auth');
          this.isLoadingSubject.next(false);
          this.router.navigate(['/libertario/entrar']);

          return EMPTY;
        })
      )
      .subscribe(_response => {
        this.user = undefined;
        localStorage.removeItem('auth');
        this.isLoadingSubject.next(false);
        this.router.navigate(['/libertario/entrar']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
