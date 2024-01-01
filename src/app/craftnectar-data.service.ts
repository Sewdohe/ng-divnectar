import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerlistResponse } from '../types';


@Injectable({
  providedIn: 'root',
})
export class CraftnectarDataService {
  private apiUrl = 'http://craft.divnectar.com:4444/api/placeholder';
  // @ts-ignore
  playerList$: Observable<PlayerlistResponse>;

  constructor(private http: HttpClient) {
    this.playerList$ = this.http
    .post<PlayerlistResponse>(this.apiUrl, "%playerlist_alltime:_list%", {
      headers: {
        Authorization: "Bearer testingthis",
        Accept: "Application/JSON"
      }
    })
  }
}
