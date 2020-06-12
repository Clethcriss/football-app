import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { MatchComponent } from './match/match.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigatorComponent } from './navigator/navigator.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: ':competition-id', component: CompetitionComponent },
  { path: ':competition-id/:match-id', component: MatchComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompetitionComponent,
    MatchComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
