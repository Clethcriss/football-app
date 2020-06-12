import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnChanges {

  @Input() links;
  competitionName: string;
  vsTeams: string;

  constructor(private http: HttpService) { }

  displayCrumb(index: number, id: string) {
    switch (index) {
      case 0:
        if (this.links.length > 0) {
          this.http.fetchCompetitionName(id).subscribe(nameData => {
            this.competitionName = nameData;
          });
        }
        break;
      case 1:
        if (this.links.length > 1) {
          this.http.fetchEventTeamsAndCompetitionName(id).subscribe(data => {
            this.vsTeams = data.vsTeams;
            this.competitionName = data.competitionName;
          });
        }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.links.previousValue) {
      const currentLength = changes.links.currentValue.length;
      const prevLength = changes.links.previousValue.length;
      if (currentLength !== prevLength) {
        this.competitionName = '';
        this.vsTeams = '';
        this.displayCrumb(currentLength - 1, this.links[currentLength - 1]);
      }
    }
  }
}
