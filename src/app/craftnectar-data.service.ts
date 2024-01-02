import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, map, tap } from 'rxjs';
import { PlayerData, PlayerlistResponse } from '../types';
import { environment } from './../environments/environment';
import { WindowService } from './window.service';


@Injectable({
  providedIn: 'root',
})
export class CraftnectarDataService {
  private apiUrl = environment.baseUrl;
  // @ts-ignore
  playerList$: Observable<PlayerlistResponse>;
  data$: any;
  playerData: PlayerData[] = [];
  players: string[] = [];
  // @ts-ignore
  public playerData$: ReplaySubject<PlayerData[]> = new ReplaySubject();

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private win: WindowService) {
    console.log(`Server data service started in ${environment.production ? 'production mode' : 'development mode'}`)

    this.data$ = this.http
      .post<PlayerlistResponse>(this.apiUrl, "%playerlist_alltime:_list%", {
        headers: {
          Authorization: "Bearer testingthis",
          Accept: "Application/JSON"
        },
      }).pipe(
        map(listRes => {
          return listRes.placeholder.split(', ')
        }),
        map((players: string[]) => {
         return players.map(player => {
            return {
              name: player,
              avatarUrl: `https://mc-heads.net/avatar/${player}/32.png`
            }
         })
        })
      )

  }

  // getAvatarData(players: string[]) {
  //   players.forEach(p => {
  //     if (isPlatformBrowser(this.platformId)) { // only perform this iteration when on the client/browser. No window object to build URL from otherwise.
  //       this.http.get(`https://mc-heads.net/avatar/${p}/32`, { responseType: 'arraybuffer' }).pipe(
  //         tap(res => {
  //           var arrayBufferView = new Uint8Array(res);
  //           var blob = new Blob([arrayBufferView], { type: "image/png" });
  //           var urlCreator = this.win.nativeWindow.URL || this.win.nativeWindow.webkitURL;
  //           var imageUrl = urlCreator.createObjectURL(blob);
  //           console.log(`Got avatar for player ${p}: ${imageUrl}`)
  //           this.playerData.push({ name: p, avatarUrl: imageUrl })
  //         })
  //       )
  //     }
  //   })
  //   this.playerData$.next(this.playerData)
  // }
}
