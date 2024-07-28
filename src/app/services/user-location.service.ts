import { Injectable } from '@angular/core';
import {
  IConcelhos,
  IDistritos,
  IFreguesias,
  IUserLocationFile,
} from '../lib/interfaces/user-location';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private dataUrl = 'assets/json/all-portugal.json';

  constructor(private http: HttpClient) {}

  loadData(): Observable<IUserLocationFile> {
    return this.http.get<IUserLocationFile>(this.dataUrl);
  }

  loadDistricts(): Observable<IDistritos> {
    return this.loadData().pipe(
      map(data => {
        console.log('loadDistricts', data);

        if (data && data.all && data.all) {
          return {
            districtos: data.all.map(distrito => ({
              uuid: distrito.uuid,
              name: distrito.name,
            })),
          };
        } else {
          return { districtos: [] };
        }
      })
    );
  }

  loadConcelhos(): Observable<IConcelhos> {
    return this.loadData().pipe(
      map(data => ({
        concelhos: data.all.flatMap(distrito =>
          distrito.concelhos.flatMap(concelho => ({
            uuid: concelho.uuid,
            name: concelho.name,
          }))
        ),
      }))
    );
  }

  loadFreguesias(): Observable<IFreguesias> {
    return this.loadData().pipe(
      map(data => ({
        freguesias: data.all
          .flatMap(distrito =>
            distrito.concelhos.flatMap(concelho => concelho.freguesias)
          )
          .map(freguesia => ({
            uuid: freguesia.uuid,
            name: freguesia.name,
          })),
      }))
    );
  }

  loadFullFreguesias(): Observable<IFreguesias> {
    return this.loadData().pipe(
      map(data => {
        const freguesias: { uuid: string; name: string }[] = [];
        data.all.forEach(distrito => {
          distrito.concelhos.forEach(concelho => {
            concelho.freguesias.forEach(freguesia => {
              const name = `${freguesia.name} - ${concelho.name} [${distrito.name}]`;
              freguesias.push({
                uuid: freguesia.uuid,
                name: name,
              });
            });
          });
        });
        return { freguesias: freguesias };
      })
    );
  }

  teste(): void {
    this.loadData().subscribe(console.log);
  }
}
