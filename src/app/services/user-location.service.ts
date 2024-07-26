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
  private dataUrl = 'assets/jsons/all-portugal.json';

  constructor(private http: HttpClient) {}

  loadData(): Observable<IUserLocationFile> {
    return this.http.get<IUserLocationFile>(this.dataUrl);
  }

  loadDistricts(): Observable<IDistritos> {
    return this.loadData().pipe(
      map(data => ({
        districtos: data.all.distritos.map(distrito => ({
          uuid: distrito.uuid,
          name: distrito.name,
        })),
      }))
    );
  }

  loadConcelhos(): Observable<IConcelhos> {
    return this.loadData().pipe(
      map(data => ({
        concelhos: data.all.distritos.flatMap(distrito =>
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
        freguesias: data.all.distritos
          .flatMap(distrito =>
            distrito.concelhos.flatMap(concelho => concelho.freguesia)
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
        data.all.distritos.forEach(distrito => {
          distrito.concelhos.forEach(concelho => {
            concelho.freguesia.forEach(freguesia => {
              const name = `${freguesia.name} - ${concelho.name} - ${distrito.name}`;
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
}
