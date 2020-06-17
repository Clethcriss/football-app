import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  @Input() links: {type: string; id: string; name: string}[];

  constructor() { }
}
