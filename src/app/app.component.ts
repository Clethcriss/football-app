import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'football-app';
  homeLink = {type: 'home', id: '', name: 'Competitions'};
  links: {type: string; id: string; name: string}[] = [this.homeLink];


  constructor() {
  }

  onActive(elementRef) {
    elementRef.onSelected.subscribe(event => {
      console.log(event.type);
      switch (event.type) {
        case 'competition':
          this.links = [this.homeLink, event];
          break;
        case 'event':
          this.links.push(event);
          break;
        case 'home':
          this.links = [event];
      }
    })
  }

}
