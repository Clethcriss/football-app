import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Since the free api has limitations, these are the given competition options
  competitions: {id: string; name: string; area: string}[] = [
    {id: '2000', name: 'FIFA World Cup', area: 'World'},
    {id: '2001', name: 'UEFA Champions League', area: 'Europe'},
    {id: '2002', name: 'Bundesliga', area: 'Germany'},
    {id: '2003', name: 'Eredivisie', area: 'Netherlands'},
    {id: '2013', name: 'Série A', area: 'Brazil'},
    {id: '2014', name: 'Primera Division', area: 'Spain'},
    {id: '2015', name: 'Ligue 1', area: 'France'},
    {id: '2016', name: 'Championship', area: 'England'},
    {id: '2017', name: 'Primeira Liga', area: 'Portugal'},
    {id: '2018', name: 'European Championship', area: 'Europe'},
    {id: '2019', name: 'Serie A', area: 'Italy'},
    {id: '2021', name: 'Premier League', area: 'England'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
