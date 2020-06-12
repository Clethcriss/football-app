import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'football-app';
  links: string[];


  constructor(private route: ActivatedRoute) {
  }

  onActive(activeEvent: any) {
    let linksIds = []
    for (let key in activeEvent.routeParams) {
      if (activeEvent.routeParams.hasOwnProperty(key)) {
        linksIds.push(activeEvent.routeParams[key]);
      }
    }
    this.links = linksIds;
  }

}
