import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CraftnectarComponent } from './craftnectar/craftnectar.component';
import { PagePlayersComponent } from './page-players/page-players.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'craftnectar', component: CraftnectarComponent },
    { path: 'players', component: PagePlayersComponent },
    { path: 'map', component: MapComponent}
  ];