import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CraftnectarComponent } from './craftnectar/craftnectar.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'craftnectar', component: CraftnectarComponent }
  ];