import { Component, Input } from '@angular/core';
import {Game} from '../shared/game';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent {

  @Input() game: Game;

}