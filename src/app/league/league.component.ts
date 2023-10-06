import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from './league.service';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(LeagueService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      console.log(params.get('id'));
      this.service
        .getStanding(id)
        .subscribe((standings) => console.log(standings));
    });
  }
}
