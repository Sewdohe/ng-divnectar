import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, concatMap, map, switchMap, tap } from 'rxjs';
import { PlayerData, PlayerlistResponse } from '../types';
import { environment } from './../environments/environment';
import { WindowService } from './window.service';

enum PLACEHOLDERS {
  LEVEL = '%parseother_{sewdohe}_{alonsolevels_level}%',
  OFFLINE = '%playerlist_offline:_list%',
  ONLINE = "%playerlist_online:_list%"
}

@Injectable({
  providedIn: 'root',
})
export class CraftnectarDataService {
  private apiUrl = environment.baseUrl;
  // @ts-ignore
  playerList$: Observable<PlayerlistResponse>;
  onlineData$: any = new ReplaySubject();
  offlineData$: any = new ReplaySubject();
  playerData: PlayerData[] = [];
  players: string[] = [];
  // @ts-ignore
  public playerData$: ReplaySubject<PlayerData[]> = new ReplaySubject();

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private win: WindowService) {
    console.log(`Server data service started in ${environment.production ? 'production mode' : 'development mode'}`)

    this.onlineData$ = this.http
      .post<PlayerlistResponse>(this.apiUrl, PLACEHOLDERS.ONLINE, {
        headers: {
          Authorization: "Bearer testingthis",
          Accept: "Application/JSON"
        },
      }).pipe(
        // this recieves the response data from the post req:
        // { status: bool, placeholder: string}
        map(listRes => {
          return listRes.placeholder.split(', ') // then split the string by commas to get an array of players
        }),
        map((players: string[]) => { // map this array of strings into an array of objects with player name and avatar URL property
            console.log(`players value: ${players.length}`)
            if(players.length == 1 && players[0] == '') {
              console.log('no players')
              return null
            } else {
              return players.map(player => {
                return {
                  name: player,
                  avatarUrl: `https://mc-heads.net/avatar/${player}/32.png`
                }
              })
            }
        }),
        tap(console.log)
      )

      this.offlineData$ = this.http
      .post<PlayerlistResponse>(this.apiUrl, PLACEHOLDERS.OFFLINE, {
        headers: {
          Authorization: "Bearer testingthis",
          Accept: "Application/JSON"
        },
      }).pipe(
        // this recieves the response data from the post req:
        // { status: bool, placeholder: string}
        map(listRes => {
          return listRes.placeholder.split(', ') // then split the string by commas to get an array of players
        }),
        map((players: string[]) => { // map this array of strings into an array of objects with player name and avatar URL property
          return players.map(player => {
            return {
              name: player,
              avatarUrl: `https://mc-heads.net/avatar/${player}/32.png`
            }
          })
        }),
        // tap(console.log)
      )
  }
}
