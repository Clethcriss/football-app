import { Component } from '@angular/core';
import { ECrumbData, ICrumbData } from './models/crumbData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'football-app';
  homeLink = {type: ECrumbData.HOME, id: '', name: 'Competitions'};
  links: ICrumbData[] = [this.homeLink];


  constructor() {
  }

  onActive(elementRef) {
    elementRef.onSelected.subscribe(event => {
      switch (event.type) {
        case ECrumbData.COMPETITION:
          this.links = [this.homeLink, event];
          break;
        case ECrumbData.EVENT:
          this.links.push(event);
          break;
        case ECrumbData.HOME:
          this.links = [event];
      }
    })
  }

}
