import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';
import { IDetailedMatch } from '../models/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchDetails: IDetailedMatch;
  isFetchingMatch = false;
  routeParams: any;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    this.routeParams = route.snapshot.params;
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['match-id'];
    this.isFetchingMatch = true;
    this.http.fetchEvent(eventId).subscribe(eventDetails => {
      this.matchDetails = eventDetails;
      this.error = false;
      this.isFetchingMatch = false;
      this.setRouteParams();
    }, error => {
      this.error = true;
    });
  }

  getStatus() {
    const status = this.matchDetails.status;
    switch (status) {
      case 'SCHEDULED':
        return 'Scheduled';
      case 'IN_PLAY':
      case 'PAUSED':
        return 'LIVE!'
    }
  }

  getPeriodScore(period: string) {
    const homeTeamScore = this.matchDetails.score[period].homeTeam;
    const awayTeamScore = this.matchDetails.score[period].awayTeam;
    return {
      [period]: homeTeamScore && awayTeamScore,
      homeTeamScore,
      awayTeamScore
    }
  }

  setRouteParams(){
    this.routeParams = {
      ...this.routeParams,
      competitionName: this.matchDetails.competition.name,
      vsTeams: `${this.matchDetails.homeTeam.name} vs ${this.matchDetails.awayTeam.name}`
    }
  }

}
