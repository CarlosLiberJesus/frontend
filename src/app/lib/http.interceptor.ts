/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          if (body.code === 401 || body.code === 403) {
            this.alertService.setAlert({
              code: 401,
              title: 'Sessão expirada',
              message: 'Por favor, realize o login novamente',
            });

            if (body.url !== '/api/auth/login') {
              this.userService.logOut();
            }
            throw new Error('Unauthorized');
          } else if (body.code === 500) {
            this.alertService.setAlert({
              code: 500,
              title:
                (body.message ?? 'Erro de Servidor') + ' (' + body.url + ')',
              message: '',
              exception: {
                message:
                  body.exception?.message ??
                  'Erro desconhecido. Por favor tente novamente',
                file: body.exception?.file,
                line: body.exception?.line,
                errors: body.exception?.errors,
              },
            });
            throw new Error('Exception');
          }
        }
      })
    );
  }
}
