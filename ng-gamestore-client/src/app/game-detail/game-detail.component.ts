import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../shared/game';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  game: Game;
  gameId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private gameService: GameService) { }

  ngOnInit() {

    this.gameId = parseInt(this.activatedroute.snapshot.params['gameId']);
    this.gameService.getGameById(this.gameId).subscribe(
      (data: Game) => this.game = data
    );
  }

  goEdit():void{
    this.router.navigate(['/games', this.gameId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
