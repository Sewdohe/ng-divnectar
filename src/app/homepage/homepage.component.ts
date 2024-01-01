import { Component } from '@angular/core';
import { CraftnectarDataService } from '../craftnectar-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  providers: [
    HttpClientModule,
    CraftnectarDataService
  ],
})
export class HomepageComponent {

}
