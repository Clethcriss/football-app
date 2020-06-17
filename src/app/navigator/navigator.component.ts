import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  @Input() links: {type: string; id: string; name: string}[];

  constructor() { }
}
