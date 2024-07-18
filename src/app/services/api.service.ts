import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, shareReplay } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServer = `${environment.apiServer}`;
  private appId = `${environment.appKey}`;

  constructor(private http: HttpClient) {}

  /**
   * Função genérica, para routas públicas
   *
   * @param path url da rotas
   * @param data parametros
   * @returns Resposta estruturada em estado Observable
   */
  get<T>(path = '', data = {}): Observable<IApiResponse<T>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'App-Uuid': `${this.appId}`,
    });

    const url = `${this.apiServer}` + '/api' + path;
    return this.http
      .post<IApiResponse<T>>(url, data, { headers })
      .pipe(shareReplay());
  }

  /**
   * Função principal, inclui nos headers o JTW token
   *
   * @param path url da rotas
   * @param data parametros
   * @returns Resposta estruturada em estado Observable
   */
  fetch<T>(path = '', data = {}): Observable<IApiResponse<T>> {
    // TODO dont know if best...
    const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');
    if (!auth.accessToken) {
      return of({
        success: false,
        code: 401,
        url: '',
        message: 'Unauthorized Token',
        exception: {
          message: 'Não tem token inicializado, por favor proceda ao login',
        },
      }) as Observable<IApiResponse<T>>;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'App-Uuid': `${this.appId}`,
      Authorization: `Bearer ${auth.accessToken}`,
    });
    const url = `${this.apiServer}` + '/api' + path;
    return this.http
      .post<IApiResponse<T>>(url, data, { headers })
      .pipe(shareReplay());
  }
}
