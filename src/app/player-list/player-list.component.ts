import { Component } from '@angular/core';
import { PlayerlistResponse, PlayerData } from '../../types';
import { CraftnectarDataService } from '../craftnectar-data.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'; 
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent {
  players: string[] = [];
  playerData: PlayerData[] = [];
  displayedColumns: string[] = ['avatar', 'name'];

  constructor(public serverData: CraftnectarDataService) {
    
  }
}