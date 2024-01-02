import { Component } from '@angular/core';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
    selector: 'app-page-players',
    standalone: true,
    templateUrl: './page-players.component.html',
    styleUrl: './page-players.component.scss',
    imports: [PlayerListComponent]
})
export class PagePlayersComponent {

}
