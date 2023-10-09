import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeagueService } from './league.service';
import { TableModule } from 'primeng/table';
import { Standing } from './standing';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private leagueService = inject(LeagueService);

  standings: Standing[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const leagueId = params.get('id');
      if (!leagueId) return;
      this.leagueService.getStandings(leagueId).subscribe((standings) => {
        this.standings = standings;
      });
    });
  }
}
