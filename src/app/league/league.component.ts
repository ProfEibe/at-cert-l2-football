import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from './league.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(LeagueService);

  standings = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      console.log(params.get('id'));
      this.service.getStanding(id).subscribe((standings) => {
        this.standings = standings.response[0].league.standings[0];
      });
    });
  }
}
