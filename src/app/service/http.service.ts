import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICompetition } from '../models/competition.interface';
import { IDetailedMatch, IMatch } from '../models/match.interface';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class HttpService {
  private headers = new HttpHeaders({'X-Auth-Token': environment.apiKey})
  private activeStatuses = ['SCHEDULED', 'IN_PLAY', 'PAUSED'];

  constructor(private http: HttpClient) {
  }

  fetchCompetition(competitionId: string) {
    return this.http.get(
      `${environment.apiUrl}/competitions/${competitionId}`, {
        headers: this.headers
      }
    ).pipe(map(responseData => {
      let competitionData: ICompetition = {
        id: responseData['id'],
        area: responseData['area'],
        name: responseData['name'],
        currentSeason: responseData['currentSeason']
      };
      return competitionData;
    }));
  }

  fetchEvents(competitionId) {
    return this.http.get(
      `${environment.apiUrl}/competitions/${competitionId}/matches`, {
        headers: this.headers
      }
    ).pipe(map(responseData => {
      const events: IMatch[] = [];
      if (responseData.hasOwnProperty('matches')) {
        for (let match of responseData['matches']) {
          if (this.activeStatuses.includes(match.status)) {
            events.push({
              id: match.id,
              utcDate: match.utcDate,
              status: match.status,
              matchDay: match.matchday,
              homeTeam: match.homeTeam,
              awayTeam: match.awayTeam
            })
          }
        }
      }
      return events;
    }));
  }

  fetchEvent(eventId) {
    return this.http.get(
      `${environment.apiUrl}/matches/${eventId}`, {
        headers: this.headers
      }
    ).pipe(map(matchData => {
      if (matchData.hasOwnProperty('match')) {
        const event: IDetailedMatch = {
          id: matchData['match']['id'],
          utcDate: matchData['match']['utcDate'],
          status: matchData['match']['status'],
          matchDay: matchData['match']['matchday'],
          homeTeam: matchData['match']['homeTeam'],
          awayTeam: matchData['match']['awayTeam'],
          competition: {
            ...matchData['match']['competition'],
            area: matchData['match']['competition']['area']['name']
          },
          score: matchData['match']['score']
        };
        return event;
      }
    }));
  }

  fetchEventTeamsAndCompetitionName(eventId) {
    return this.http.get(
      `${environment.apiUrl}/matches/${eventId}`, {
        headers: this.headers
      }
    ).pipe(map(matchData => {
      if (matchData.hasOwnProperty('match')) {
        const homeTeam = matchData['match']['homeTeam']['name'];
        const awayTeam = matchData['match']['awayTeam']['name'];
        const competitionName = matchData['match']['competition']['name'];
        return {
          vsTeams: `${homeTeam} vs ${awayTeam}`,
          competitionName: competitionName
        }
      }
    }));
  }

  fetchCompetitionName(competitionId) {
    return this.http.get(
      `${environment.apiUrl}/competitions/${competitionId}`, {
        headers: this.headers
      }
    ).pipe(map(responseData => {
      const competitionName = responseData['name'];
      return competitionName;
    }));
  }
}
