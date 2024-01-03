import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import { FooterComponent } from '../footer/footer.component';


interface MenuNode {
  name: string,
  icon: string,
  route: string,
  children?: MenuNode[]
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule,
    FooterComponent
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  navigationItems: MenuNode[] = [
    {
      name: 'Home',
      icon: 'home',
      route: '',
    },
    {
      name: 'CraftNectar',
      icon: 'dns',
      route: '/craftnectar',
      children: [
        {
          name: 'Player List',
          icon: 'person',
          route: '/players'
        },
        {
          name: 'Dynmap',
          icon: 'map',
          route: '/map'
        },
        // {
        //   name: 'Leaderboard',
        //   icon: 'leaderboard',
        //   route: '/leaderboard'
        // }
      ]
    }
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
