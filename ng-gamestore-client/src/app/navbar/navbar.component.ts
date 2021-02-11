import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: any;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void { }

  newGame() {
    // Get max game Id from the game list
    this.gameService.getMaxGameId().subscribe(
      data => this.id = data
    );
    this.router.navigate(['/games', this.id, 'new'])

}

}
