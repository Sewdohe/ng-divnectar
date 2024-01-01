import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerlistResponse } from '../types';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CraftnectarDataService {
  private apiUrl = environment.baseUrl;
  // @ts-ignore
  playerList$: Observable<PlayerlistResponse>;

  constructor(private http: HttpClient) {
    console.log(`Server data service started in ${environment.production ? 'production mode' : 'development mode'}`)
    console.log(`API URL is: ${this.apiUrl}`)

    this.playerList$ = this.http
    .post<PlayerlistResponse>(this.apiUrl, "%playerlist_alltime:_list%", {
      headers: {
        Authorization: "Bearer testingthis",
        Accept: "Application/JSON"
      },
      
    })
  }
}
