import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PlayerListData, PlayerlistResponse } from '../types';
import { environment } from './../environments/environment';
import { WindowService } from './window.service';


@Injectable({
  providedIn: 'root',
})
export class CraftnectarDataService {
  private apiUrl = environment.baseUrl;
  // @ts-ignore
  playerList$: Observable<PlayerlistResponse>;
  playerData: PlayerListData[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private win: WindowService) {
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

  getAvatarData(players: string[]) {
    players.forEach(p => {
      if(isPlatformBrowser(this.platformId)) {
        // Use the window reference: this.windowRef
        //Eg: this.win.nativeWindow.location.pathname
        this.http.get(`https://mc-heads.net/avatar/${p}/32`, { responseType: 'arraybuffer' }).pipe(
          tap(res => {
            var arrayBufferView = new Uint8Array(res);
            var blob = new Blob([arrayBufferView], { type: "image/png" });
            var urlCreator = this.win.nativeWindow.URL || this.win.nativeWindow.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            // console.log(`Got avatar for player ${p}: ${imageUrl}`)
            this.playerData.push({name: p, avatar: imageUrl})
          })
        ).subscribe(endRes => {
          console.log('done')
        })
      }
    })

    return this.playerData;
  }
}
