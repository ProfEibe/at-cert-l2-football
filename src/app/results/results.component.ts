import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ResultsService } from './results.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private resultsService = inject(ResultsService);

  fixtures: any[] = []; // todo: böse!!

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('team');
      const league = params.get('id');
      if (!id || !league) return;
      this.resultsService
        .getLast10Fixtures(league, id)
        .subscribe((fixtures: any[]) => {
          this.fixtures = fixtures;
        });
    });
  }
}
