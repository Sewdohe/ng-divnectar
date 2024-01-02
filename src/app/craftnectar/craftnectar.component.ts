import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


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

  constructor() {
    
  }
}
