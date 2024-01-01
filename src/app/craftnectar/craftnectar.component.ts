import { Component } from '@angular/core';
import { CraftnectarDataService } from '../craftnectar-data.service';
import { Observable } from 'rxjs';
import { PlayerlistResponse } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-craftnectar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './craftnectar.component.html',
  styleUrl: './craftnectar.component.scss'
})
export class CraftnectarComponent {
  players: string[] = [];

  constructor(private serverData: CraftnectarDataService) {
    serverData.playerList$.subscribe(data => {
      let players = data.placeholder.split(", ")
      console.log(players)
      this.players = players
    })
  }
}
