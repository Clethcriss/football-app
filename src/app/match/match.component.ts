import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../service/http.service';
import { IDetailedMatch } from '../models/match.interface';
import { ECrumbData, ICrumbData } from '../models/crumbData.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {

  @Output() onSelected = new EventEmitter<ICrumbData>();
  matchDetails: IDetailedMatch;
  isFetchingMatch = false;
  error = false;
  private interval;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['match-id'];
    this.isFetchingMatch = true;
    this.fetchData(eventId)
    this.interval = setInterval(() => {
      this.fetchData(eventId);
    }, environment.fetchDataInterval);

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

  fetchData(eventId) {
    this.http.fetchEvent(eventId).subscribe(eventDetails => {
      this.matchDetails = eventDetails;
      this.error = false;
      if(this.isFetchingMatch) {
        this.onSelected.emit({
          type: ECrumbData.EVENT,
          id: eventDetails.id.toString(),
          name: `${eventDetails.homeTeam.name} vs ${eventDetails.awayTeam.name}`
        });
      }
      this.isFetchingMatch = false;
    }, error => {
      this.error = true;
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
