import { Component } from '@angular/core';
import { CraftnectarDataService } from '../craftnectar-data.service';
import { Observable } from 'rxjs';
import { PlayerlistResponse, PlayerListData } from '../../types';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-craftnectar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './craftnectar.component.html',
  styleUrl: './craftnectar.component.scss'
})
export class CraftnectarComponent {
  players: string[] = [];
  playerData: PlayerListData[] = [];

  constructor(private serverData: CraftnectarDataService) {
    serverData.playerList$.subscribe(data => {
      let players = data.placeholder.split(", ")
      console.log(players)
      this.players = players
      this.playerData = serverData.getAvatarData(this.players)
    })
  }
}
