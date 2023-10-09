import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

type leagueId = { id: number; name: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, RouterLink, RippleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'at-cert-l2-football';

  leagues: leagueId[] = [
    { id: 39, name: 'England' },
    { id: 140, name: 'Spain' },
    { id: 78, name: 'Germany' },
    { id: 61, name: 'France' },
    { id: 135, name: 'Italy' },
  ];
}
