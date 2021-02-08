import { Component, OnInit } from '@angular/core';
import {Game} from '../shared/game';
import {GameService} from '../shared/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Array de todos los games
  games: Game[] = []

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(
      (data: Game[]) => this.games = data
    );
  }

}
