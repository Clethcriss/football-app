import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';
import { ICompetition } from '../models/competition.interface';
import { IMatch } from '../models/match.interface';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition: ICompetition;
  events: IMatch[] = [];
  isFetchingCompetition = false;
  isFetchingEvents = false;
  routeParams: any;
  competitionError = false;
  eventsError = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.routeParams = this.route.snapshot.params;
  }

  ngOnInit(): void {
    const competitionId = this.route.snapshot.params['competition-id'];
    this.isFetchingCompetition = true;
    this.isFetchingEvents = true;
    this.httpService.fetchCompetition(competitionId).subscribe(competitionData => {
      this.competition = competitionData;
      this.competitionError = false;
      this.isFetchingCompetition = false;
    }, error => {
      this.competitionError = true;
    });
    this.httpService.fetchEvents(competitionId).subscribe(eventsData => {
      this.events = eventsData;
      this.eventsError = false;
      this.isFetchingEvents = false;
    }, error => {
      this.eventsError = true;
    })
  }

}
